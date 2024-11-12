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
    <div className="w-screen max-w-[1920px] h-screen flex flex-col items-center justify-center md:flex-row md:justify-around p-4">
      {/* Image Section */}
      <Image src={wowHire} alt="logo" className="rounded-full w-[80%] max-w-xs md:w-[40%] mb-8 md:mb-0" />

      {/* Text and Button Section */}
      <div className="w-full max-w-lg flex flex-col items-center md:items-start text-center md:text-left">
        <p className="text-5xl md:text-7xl font-header text-black/80">WOWHIRE</p>
        <p className="text-3xl md:text-5xl font-bold text-black mt-4">Slave away,</p>
        <p className="text-3xl md:text-5xl font-bold text-black">Work to Earn!</p>

        {/* Metamask Login Button */}
        <button
          onClick={() => connect({ connector: metaMask[0] })}
          className="w-48 py-3 mt-10 text-center text-black font-semibold text-lg md:text-xl rounded-lg bg-primary transform transition-transform duration-300 hover:scale-110"
        >
          LOGIN TO METAMASK
        </button>

        {/* Link Button */}
        <Link
          href="/login"
          className="w-48 py-3 mt-5 text-center text-black font-semibold text-lg md:text-xl rounded-lg border border-primary transform transition-transform duration-300 hover:scale-110"
        >
          BRIDGE FROM BTC
        </Link>
      </div>
    </div>
  );
}

function HirePortal() {
  return (
    <div className="w-screen max-w-[1920px] h-screen flex flex-col items-center justify-center md:flex-row md:justify-around p-4">
      {/* Image Section */}
      <Image src={wowHire} alt="logo" className="rounded-full w-[80%] max-w-xs md:w-[40%] mb-8 md:mb-0" />

      {/* Text and Button Section */}
      <div className="w-full max-w-lg flex flex-col items-center md:items-start text-center md:text-left">
        <p className="text-5xl md:text-7xl font-header text-black/80">WOWHIRE</p>
        <p className="text-3xl md:text-5xl font-bold text-black mt-4">Slave away,</p>
        <p className="text-3xl md:text-5xl font-bold text-black">Work to Earn!</p>
        {/* Buttons */}
        <Link
          href="/get-hired"
          className="w-48 py-3 mt-10 text-center font-semibold text-lg md:text-xl rounded-lg bg-primary transform transition-transform duration-300 hover:scale-110"
        >
          GET HIRED
        </Link>
        <Link
          href="/hire-someone"
          className="w-48 py-3 mt-5 text-center text-black font-semibold text-lg md:text-xl rounded-lg border border-primary transform transition-transform duration-300 hover:scale-110"
        >
          HIRE SOMEONE
        </Link>
      </div>
    </div>
  );
}
