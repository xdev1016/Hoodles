import React, { useEffect, useRef, useState } from "react";
import { useEthers, useEtherBalance, useSendTransaction } from "@usedapp/core";
const { sendTransaction } = useSendTransaction()
import Identicon from "./icon";
import "../common.scss";
const ConnectButton = () => {
  const [connecting, setConnecting] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  useEffect(() => {
    setConnecting(false);
  }, [account, activateBrowserWallet]);
  const handleConnectWallet = async () => {
    setConnecting(true);
    await activateBrowserWallet();
    if (!account) {
      setConnecting(false);
    }
  };
  return account ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span className="wallet">
        {" "}
        {account &&
          `${account.slice(0, 6)}...${account.slice(
            account.length - 4,
            account.length
          )}`}
      </span>
      <Identicon />
    </div>
  ) : (
    <button className="connect-btn" onClick={handleConnectWallet}>
      {connecting ? "..." : "CONNECT WALLET"}
    </button>
  );
};

export default ConnectButton;
