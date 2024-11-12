"use client";
import { useAccount as useSatsAccount, useBalance } from "@gobob/sats-wagmi";
import { useAccount } from "wagmi";
import { gatewaySDK } from "@/utils/gateway";
import { useCallback, useEffect, useState } from "react";
import {
  GatewayQuote,
  GatewayQuoteParams,
  GatewayStrategyContract,
  GatewayTokensInfo,
  Token,
} from "@gobob/bob-sdk/dist/gateway/types";
import { WalletOptions } from "@/components/WalletOptions";
import _, { debounce } from "lodash";
import crypto from "crypto";

export default function Page() {
  const [water, setWater] = useState(false);
  useEffect(() => {
    setWater(true);
  }, []);

  const [tokenOptions, setTokenOptions] = useState<Token[]>([]);
  const [quote, setQuote] = useState<GatewayQuote & GatewayTokensInfo>();
  const [sendAmount, setSendAmount] = useState(0.00001);
  const [refillAmount, setRefillAmount] = useState(0.00001);
  const [quoteParams, setQuoteParams] = useState<GatewayQuoteParams>();
  const [btcOption, setBtcOption] = useState<string>();
  const { address, connector, publicKey } = useSatsAccount();
  const { address: evmAddress } = useAccount();
  const { data: balanceData } = useBalance();

  useEffect(() => {
    const getTokensOption = async () => {
      const outputTokens = await gatewaySDK.getTokens();
      setTokenOptions(outputTokens);
    };
    getTokensOption();
  }, []);

  if (!water) return <></>;

  console.log(balanceData?.total);

  const startOrder = async () => {
    try {
      const { uuid, psbtBase64 } = await gatewaySDK.startOrder(quote!, quoteParams!);
      console.log(uuid);
      console.log(psbtBase64);
      const bitcoinTxHex = await connector?.signAllInputs(psbtBase64!);
      console.log(bitcoinTxHex);
      await gatewaySDK.finalizeOrder(uuid, bitcoinTxHex!);
    } catch (e) {
      console.error(e);
    }
  };

  const getQuote = async () => {
    if (!address || !evmAddress) return;
    const qp: GatewayQuoteParams = {
      fromToken: "BTC",
      fromChain: "Bitcoin",
      fromUserAddress: address,
      toChain: "bob-sepolia",
      toUserAddress: evmAddress,
      toToken: "tBTC",
      amount: Math.floor(sendAmount * 1e8),
      gasRefill: Math.floor(refillAmount * 1e8),
      fromUserPublicKey: publicKey,
    };
    console.log("Here");
    setQuoteParams(qp);
    const quote = await gatewaySDK.getQuote(qp);
    setQuote(quote);
    console.log(quote);
  };

  const handleSendAmountChange = (v: string) => {
    setSendAmount(Number(v));
    setQuote(undefined);
  };

  const handleSelectChange = (v: string) => {
    setBtcOption(v);
    setQuote(undefined);
  };

  const handleGasRefillChange = (v: string) => {
    setRefillAmount(Number(v));
    setQuote(undefined);
  };

  return (
    <div className="container w-1/2 mx-auto my-5">
      <div className="flex flex-col gap-1">
        <WalletOptions />
      </div>
      <div className="flex flex-col gap-1 align-middle mt-3">
        <p>EVM Address: {evmAddress}</p>
        <p>Address: {address}</p>
        <p>Balance: {Number(balanceData?.total) / 1e8} BTC</p>
      </div>
      <div className="flex flex-col gap-1 mt-3">
        <p>From</p>
        <input
          name="sendAmount"
          type="number"
          onChange={(v) => handleSendAmountChange(v.currentTarget.value)}
          value={sendAmount}
        />
        <div className="flex flex-col">
          <p>
            Gas Refill {"("}BTC -{">"} ETH{")"}
          </p>
          <input
            className="border"
            name="gasRefill"
            type="number"
            onChange={(v) => handleGasRefillChange(v.currentTarget.value)}
            value={refillAmount}
          />
        </div>
        <p>To BOB</p>
        <select onChange={(v) => handleSelectChange(v.currentTarget.value)} defaultValue={"tBTC"}>
          {tokenOptions.map((v, i) => (
            <option key={i} value={v.symbol}>
              {v.symbol}
            </option>
          ))}
        </select>
        <div className="flex justify-between gap-1">
          <input disabled className="bg-white w-full" value={(quote?.satoshis ?? 0) / 1e8} />
          <button className="border-black border-2 w-full" onClick={() => getQuote()}>
            Get Quote
          </button>
        </div>
        <p>
          You will be getting: {(quote?.satoshis ?? 0) / 1e8} {btcOption}
        </p>
        <p>You wil be getting ETH worth of: {(quote?.fee ?? 0) / 1e8} BTC</p>
      </div>
      <div className="flex flex-col gap-1 mt-3 align-middle">
        <button className="border-black border-2 p-2" onClick={() => startOrder()} disabled={!quote}>
          Start Order
        </button>
      </div>
    </div>
  );
}
