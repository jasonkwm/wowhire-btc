import * as React from "react";
import { useConnect } from "@gobob/sats-wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const uniSatConnector = connectors.filter((connector) => connector.name === "UniSat");
  return (
    <button
      key={uniSatConnector[0].name}
      onClick={() => connect({ connector: uniSatConnector[0] })}
      className="p-2 border-2 border-primary hover:bg-primary/10"
    >
      Connect to {uniSatConnector[0].name}
    </button>
  );
}
