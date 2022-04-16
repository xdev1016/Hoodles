import { useEffect, useRef } from "react";
import { useEthers } from "@usedapp/core";
import Jazzicon from "@metamask/jazzicon";

export default function Identicon() {
  const ref = useRef<HTMLDivElement>();
  const { account } = useEthers();

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  }, [account]);
  return (
    <div
      style={{
        height: "1em",
        width: "1em",
        display: "flex",
        alignItems: "center",
      }}
      ref={ref as any}
    >
      {" "}
    </div>
  );
}
