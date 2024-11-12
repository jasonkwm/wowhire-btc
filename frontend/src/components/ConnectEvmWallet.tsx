"use client";
import * as React from "react";
import Image from "next/image";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useConnect } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const shortAddy = address ? `${address.slice(0, 5)}...${address.slice(-5)}` : "";
  return (
    <div className=" flex flex-col justify-center items-center border-primary border-2 rounded-md bg-primary text-white px-4 hover:bg-primary/50">
      {ensAvatar && <Image alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName}` : shortAddy}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}

export function EvmWallet() {
  const { connectors, connect } = useConnect();
  const metaMask = connectors.filter((connector) => connector.name === "MetaMask");
  return (
    <button
      key={metaMask[0].uid}
      onClick={() => connect({ connector: metaMask[0] })}
      className="flex gap-2 justify-center items-center border-primary border-2 rounded-md bg-primary text-white px-4 hover:bg-primary/50"
    >
      <Image src={"/MetaMask_Fox.svg"} width={48} height={48} alt="metamask logo" /> <p>Login</p>
    </button>
  );
}

export default function ConnectEvmWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <EvmWallet />;
}
