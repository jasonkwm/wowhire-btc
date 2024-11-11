"use client";

import ConnectEvmWallet from "./ConnectEvmWallet";

export default function Navbar() {
  return (
    <div className="flex justify-between p-2 shadow-lg">
      <div></div>
      <ConnectEvmWallet />
    </div>
  );
}
