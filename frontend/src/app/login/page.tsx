"use client";
import { useAccount } from "@gobob/sats-wagmi";
import { gatewaySDK } from "@/utils/gateway";
import { useEffect, useState } from "react";
import {
  GatewayQuote,
  GatewayQuoteParams,
  GatewayStrategyContract,
  GatewayTokensInfo,
  Token,
} from "@gobob/bob-sdk/dist/gateway/types";
import { WalletOptions } from "@/components/WalletOptions";

export default function Page() {
  const [water, setWater] = useState(false);
  useEffect(() => {
    setWater(true);
  }, []);

  const [tokenOptions, setTokenOptions] = useState<Token[]>([]);
  const [strategies, setStrategies] = useState<GatewayStrategyContract[]>([]);
  const [quote, setQuote] = useState<GatewayQuote & GatewayTokensInfo>();
  const { address, connector, publicKey } = useAccount();
  // const balance = useBalance();
  if (!water) return <></>;
  const getTokensOption = async () => {
    const outputTokens = await gatewaySDK.getTokens();
    setTokenOptions(outputTokens);
  };

  const quoteParams: GatewayQuoteParams = {
    fromToken: "BTC",
    fromChain: "Bitcoin",
    fromUserAddress: address!,
    toChain: "bob-sepolia",
    toUserAddress: "0x3E9b146534245268574873822640FE43cE462C93",
    toToken: "tBTC",
    amount: 2000000,
    gasRefill: 1000000,
    fromUserPublicKey: publicKey,
  };

  const getStrategies = async () => {
    const strategies = await gatewaySDK.getStrategies();
    setStrategies(strategies);
    console.log(strategies);
  };

  const getQuote = async () => {
    const quote = await gatewaySDK.getQuote(quoteParams);
    setQuote(quote);
    console.log(quote);
  };

  const startOrder = async () => {
    try {
      const { uuid, psbtBase64 } = await gatewaySDK.startOrder(quote!, quoteParams);
      console.log(uuid);
      console.log(psbtBase64);
      const bitcoinTxHex = await connector?.signAllInputs(psbtBase64!);
      console.log(bitcoinTxHex);
      await gatewaySDK.finalizeOrder(uuid, bitcoinTxHex!);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-1">
        <WalletOptions />
      </div>
      <div className="flex flex-col gap-1 align-middle mt-3">
        <p>Address: {address}</p>
        <button className="border-black border-2 p-2" onClick={() => getTokensOption()}>
          Get Token Options
        </button>
        <pre>{JSON.stringify(tokenOptions, undefined, 2)}</pre>
      </div>
      <div className="flex flex-col gap-1 mt-3 align-middle">
        <button className="border-black border-2 p-2" onClick={() => getStrategies()}>
          Get Strategies
        </button>
        <pre>{JSON.stringify(strategies, undefined, 2)}</pre>
      </div>
      <div className="flex flex-col gap-1 mt-3 align-middle">
        <button className="border-black border-2 p-2" onClick={() => getQuote()}>
          Get Quote
        </button>
        <pre>{JSON.stringify(quote, undefined, 2)}</pre>
      </div>
      <div className="flex flex-col gap-1 mt-3 align-middle">
        <button className="border-black border-2 p-2" onClick={() => startOrder()}>
          Start Order
        </button>
      </div>
    </div>
  );
}
