"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Network, SatsWagmiConfig } from "@gobob/sats-wagmi";
import React, { ReactNode } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { bobSepolia } from "wagmi/chains";
import { createClient } from "viem";
import { metaMask } from "wagmi/connectors";

const config = createConfig({
  chains: [bobSepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors: [metaMask()],
});
const queryClient = new QueryClient();

export default function Provider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <></>;
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SatsWagmiConfig network={Network.testnet} queryClient={queryClient}>
          {children}
        </SatsWagmiConfig>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
