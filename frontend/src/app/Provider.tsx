"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Network, SatsWagmiConfig } from "@gobob/sats-wagmi";
import React, { ReactNode } from "react";
const queryClient = new QueryClient();

export default function Provider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <></>;
  return (
    <QueryClientProvider client={queryClient}>
      <SatsWagmiConfig network={Network.testnet} queryClient={queryClient}>
        {children}
      </SatsWagmiConfig>
    </QueryClientProvider>
  );
}
