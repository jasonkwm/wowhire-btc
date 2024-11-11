"use client";

import Link from "next/link";
import ConnectEvmWallet from "./ConnectEvmWallet";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-2 shadow-lg">
      <div>
        <Link
          href="/"
          className="flex gap-2 justify-center items-center border-primary text-black border-2 rounded-md hover:bg-primary/50 px-4"
        >
          <Image src="/home.png" alt="a logo of a home" width={48} height={48} />
        </Link>
      </div>
      <div className="flex gap-2 h-full">
        <Link
          href="/login"
          className="flex gap-2 justify-center items-center border-primary text-black border-2 rounded-md hover:bg-primary/50 px-4"
        >
          BRIDGE FROM BTC
        </Link>
        <ConnectEvmWallet />
      </div>
    </div>
  );
}
