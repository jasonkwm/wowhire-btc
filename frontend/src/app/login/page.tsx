"use client";
import { useAccount as useSatsAccount, useBalance } from "@gobob/sats-wagmi";
import { useAccount } from "wagmi";
import { gatewaySDK } from "@/utils/gateway";
import { useEffect, useState } from "react";
import { GatewayQuote, GatewayQuoteParams, GatewayTokensInfo, Token } from "@gobob/bob-sdk/dist/gateway/types";
import { WalletOptions } from "@/components/WalletOptions";
import _ from "lodash";

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
  const [btcOption, setBtcOption] = useState<string>("tBTC");
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
    <div className="container w-full max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-2">
        <WalletOptions />
      </div>
      <div className="flex flex-col gap-2 mt-5 text-gray-800">
        <p className="font-semibold">
          EVM Address: <span className="font-normal">{evmAddress}</span>
        </p>
        <p className="font-semibold">
          Address: <span className="font-normal">{address}</span>
        </p>
        <p className="font-semibold">
          Balance: <span className="font-normal">{Number(balanceData?.total) / 1e8} BTC</span>
        </p>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <label className="font-semibold text-gray-700">From</label>
        <input
          name="sendAmount"
          type="number"
          onChange={(v) => handleSendAmountChange(v.currentTarget.value)}
          value={sendAmount}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Gas Refill (BTC → ETH)</label>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="gasRefill"
            type="number"
            onChange={(v) => handleGasRefillChange(v.currentTarget.value)}
            value={refillAmount}
          />
        </div>
        <label className="font-semibold text-gray-700">To BOB</label>
        <select
          onChange={(v) => handleSelectChange(v.currentTarget.value)}
          defaultValue={"tBTC"}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {tokenOptions.map((v, i) => (
            <option key={i} value={v.symbol}>
              {v.symbol}
            </option>
          ))}
        </select>
        <div className="flex justify-between items-center gap-3 mt-3">
          <input
            disabled
            className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 w-full text-center text-gray-700"
            value={(quote?.satoshis ?? 0) / 1e8}
          />
          <button
            className="border-2 border-gray-300 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
            onClick={() => getQuote()}
          >
            Get Quote
          </button>
        </div>
        <p className="text-gray-800 mt-2">
          You will be getting:{" "}
          <span className="font-semibold">
            {(quote?.satoshis ?? 0) / 1e8} {btcOption}
          </span>
        </p>
        <p className="text-gray-800">
          You will be getting ETH worth of: <span className="font-semibold">{(quote?.fee ?? 0) / 1e8} BTC</span>
        </p>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        {!quote && <p className="self-center">Get Quote to continue!</p>}
        <button
          className="border-2 border-gray-300 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 w-full disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
          onClick={() => startOrder()}
          disabled={!quote}
        >
          Start Order
        </button>
      </div>
    </div>
  );
}
