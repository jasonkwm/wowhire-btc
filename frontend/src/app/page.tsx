"use client";
import Image from "next/image";
import Link from "next/link";
import wowHire from "../../public/wowhire.jpg";
import { useAccount, useConnect } from "wagmi";

export default function Home() {
  const { isConnected, chain } = useAccount();
  console.log("chain", chain);
  if (!isConnected) return <SignIn />;
  return <HirePortal />;
}

function SignIn() {
  const { connectors, connect } = useConnect();
  const metaMask = connectors.filter((connector) => connector.name === "MetaMask");
  return (
    <div className="w-screen max-w-[1920px] flex h-screen items-center justify-around">
      <Image src={wowHire} alt="logo" className="rounded-full w-[40%]" />
      <div className="w-full max-w-80 h-full flex flex-col items-start justify-center">
        <p className="w-full text-center text-7xl font-header text-black/80">WOWHIRE</p>
        <p className="text-5xl font-normal text-black font-bold">Slave away,</p>
        <p className="text-5xl font-normal text-black font-bold">Work to Earn!</p>
        <button
          onClick={() => connect({ connector: metaMask[0] })}
          className="w-48 py-4 mt-10 text-center text-black font-semibold text-xl rounded-lg bg-primary transform transition-transform duration-300 hover:scale-110"
        >
          LOGIN TO METAMASK
        </button>
        <Link
          href="/login"
          className="w-48 py-4 mt-5 text-center text-black font-semibold text-xl rounded-lg border border-primary transform transition-transform duration-300 hover:scale-110"
        >
          BRIDGE FROM BTC
        </Link>
      </div>
    </div>
  );
}

function HirePortal() {
  return (
    <div className="w-screen max-w-[1920px] flex h-screen items-center justify-around">
      <Image src={wowHire} alt="logo" className="rounded-full w-[40%]" />
      <div className="w-full max-w-80 h-full flex flex-col items-start justify-center">
        <p className="w-full text-center text-7xl font-header /80">WOWHIRE</p>
        <p className="text-5xl font-normal  font-bold">Slave away,</p>
        <p className="text-5xl font-normal  font-bold">Work to Earn!</p>
        <Link
          href="/get-hired"
          className="w-48 py-4 mt-10 text-center  font-semibold text-xl rounded-lg bg-primary transform transition-transform duration-300 hover:scale-110"
        >
          GET HIRED
        </Link>
        <Link
          href="/hire-someone"
          className="w-48 py-4 mt-5 text-center  font-semibold text-xl rounded-lg border border-primary transform transition-transform duration-300 hover:scale-110"
        >
          HIRE SOMEONE
        </Link>
      </div>
    </div>
  );
}
