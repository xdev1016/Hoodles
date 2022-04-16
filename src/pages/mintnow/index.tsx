import React, { useState, FC, useEffect } from "react";
import "./mintnow.scss";
import { Contract, ethers, BigNumber } from "ethers";
// import { connect } from "http2";
import { useWeb3React } from "@web3-react/core";
import WCIcon from "../../assets/icons/walletconnectpng.png";
import MMIcon from "../../assets/icons/mm.png";
import CBIcon from "../../assets/icons/coinbase_wallet_logo.png";
import help from "../../assets/icons/help-pink.svg";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import Modal from "../../components/welcome/modal";
import contractABI from "../../assets/icons/Hoodles.json";
import {
  JsonRpcSigner,
  JsonRpcProvider,
} from "@ethersproject/providers/lib/json-rpc-provider";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";
interface MintNowPageProps {
  isGiveaway?: boolean;
  getLibrary: (provider: ExternalProvider) => Web3Provider;
}

const MintNowPage: FC<MintNowPageProps> = ({ isGiveaway, getLibrary }) => {
  const [amount, setAmount] = useState<number>(1);
  const [remaining, setRemaining] = useState<number>(3333);
  const [purchaseLimit, setPurchaseLimit] = useState<number>(6);
  const [showModal, setShowModal] = useState(false);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [supply, setSupply] = useState(0);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPublicSale, setIsPublicSale] = useState(true);
  const [isPresale, setIsPresale] = useState(false);
  const [handling, setHandling] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [provider, setProvider] = useState<JsonRpcProvider | null>(null);

  const crement = (add: number) => {
    if (add && add <= purchaseLimit) {
      setAmount(add);
    }
  };

  const contractAddress = "0x8E21Ead95dE5d5f765cF6d1444b9e773cbf52b6A";

  const { activate, deactivate, active, chainId, account, library } =
    useWeb3React();
  console.log(library, "lib");
  const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 1337],
  });
  const WC = new WalletConnectConnector({
    supportedChainIds: [1, 3, 4, 5, 1337],
    // infuraId: `https://localhost.infura.io/v3/${process.env.INFURA_KEY}`,
    infuraId: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });
  const CoinbaseWallet = new WalletLinkConnector({
    // url: `https://localhost.infura.io/v3/${process.env.INFURA_KEY}`,
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "unicornboys",
    supportedChainIds: [1, 3, 4, 5, 1337],
    darkMode: true,
  });

  useEffect(() => {
    updateEthers();

    if (isGiveaway) {
      setPurchaseLimit(0);
    } else if (isPresale && !isPublicSale) {
      setPurchaseLimit(4);
    } else if (isPublicSale && !isPresale) {
      setPurchaseLimit(6);
    }
  }, [account, supply]);

  const modalContent: JSX.Element[] = [
    <div className="">
      <div> IMPORTANT TROUBLESHOOTING TIPS</div>
      1. Ensure you have enough funds in your wallet INCLUDING gas fees (0.07
      ETH + Gas). If you don't have enough funds, the mint now button will not
      function properly.
      <div>2. If you are still unable to mint on desktop, try: </div>
      <div> a) Disconnecting your Metamask wallet </div>
      <div>b) Re-connecting to your Metamask wallet </div>
      <div>c) Refreshing the website</div>
      <div>d) Mint </div>
      <div>
        {" "}
        3. MOBILE: If you want to mint through mobile and use Metamask, you will
        have to go through Walletconnect to connect your Metamask wallet or use
        Coinbase to mint. Happy minting HOOD FAMILY!
      </div>
      <span style={{ display: "flex" }}>
        Click &nbsp;
        <a
          target="_blank"
          href="https://www.mediafire.com/file/1padhiswbbz1uxq/Mint.mp4/file"
        >
          here{" "}
        </a>
        &nbsp; for video instructions
      </span>
      <button
        className="mint-wallet-option"
        style={{ fontSize: "1em" }}
        onClick={() => setShowModal(false)}
      >
        DISMISS
      </button>
    </div>,
  ];

  const updateEthers = () => {
    if (library?.provider) {
      let tempProvider = new ethers.providers.Web3Provider(library.provider);
      // let tempProvider = new ethers.providers.JsonRpcProvider(
      //   "http://127.0.0.1:8545/"
      // );
      // let tempProvider = new ethers.providers.JsonRpcProvider(
      //   `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
      // );
      console.log(process.env.INFURA_KEY);
      // let tempProvider = getLibrary.
      setProvider(tempProvider);
      let tempSigner = tempProvider.getSigner();

      setSigner(tempSigner);
      console.log("TEMPSIGNER", tempSigner);
      if (tempSigner) {
        let tempContract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          tempSigner
        );
        setContract(tempContract);
      }
      getCurrentSupply();
      getCurrentSaleStatus();
    }
  };

  const getCurrentSupply = async () => {
    console.log("called");
    let newSupply = await contract?.getTotalSupplyMinted();
    let correctedSupply = newSupply * 1;
    console.log(correctedSupply, "sup");
    setSupply(correctedSupply);
    let percentage = (correctedSupply * 100) / 750;
    setPercentage(percentage);
  };
  useEffect(() => {
    console.log("WHYYY", supply, account, contract);
  }, [supply]);
  const getCurrentSaleStatus = async () => {
    if (contract) {
      let presale = await contract.presaleStatus;
      let publicSale = await contract.publicSaleStatus;
    }
  };
  const handleSubmit = async () => {
    console.log("call");
    try {
      setHandling(true);
      if (account && contract) {
        // if (isGiveaway) {
        //   console.log("yes");
        //   await contract.claimGiveaway();
        // } else if (isPresale && !isPublicSale) {
        // await contract.presaleMint({amount});
        let tx: any;
        let newAmount = amount * 0.07;
        if (isGiveaway) {
          tx = await contract.claimGiveaway();
        } else if (!isGiveaway) {
          tx = await contract.publicSaleMint(amount, {
            value: ethers.utils.parseEther(`${newAmount}`),
          });
        }
        await tx.wait();
        setErrorMessage("SUCCESS!");
        // } else if (isPublicSale && !isPresale) {
        //   await contract.publicSaleMint();
        // }
        setHandling(false);
      }
    } catch (err) {
      console.log(err, "error");
      setErrorMessage("Oups!");
      setHandling(false);
    }
  };

  return (
    <section className="mint-container">
      <div className="minter">
        <div className="mint-logistics">
          {contract && account && supply ? (
            <div className="progress-bar-container">
              <div className="progress-bar">
                <span
                  className="progress-bar-fill"
                  style={{
                    display: "block",
                    width: `${percentage}%`,
                    height: "100%",
                  }}
                ></span>
                <span className="supply-minted">
                  {supply}/750 MINTED BATCH 2
                </span>
              </div>
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>
              {" "}
              {account &&
                `${account.slice(0, 6)}...${account.slice(
                  account.length - 4,
                  account.length
                )}`}
            </span>
            {active ? (
              <button
                className="mint-wallet-option"
                style={{ fontSize: "1.2em" }}
                onClick={() => deactivate()}
              >
                DISCONNECT
              </button>
            ) : null}
          </div>
        </div>
        {active ? (
          <div className="mint-business-container">
            <div className="mint-business">
              <div style={{ margin: "1em 0em" }}>
                <span className="price-container">PRICE</span>
                {isGiveaway ? (
                  <div className="mint-amount">*FREE*</div>
                ) : (
                  <div className="mint-amount">
                    {(amount * 0.07).toFixed(2)} ETH
                  </div>
                )}
                <span className="price-container">+ GAS</span>
              </div>

              {/* <div className="mint-remaining">LEFT: {remaining} </div> */}
              <button
                type="submit"
                className="mint-hoodles-btn"
                onClick={() => handleSubmit()}
              >
                {isGiveaway ? "CLAIM NOW" : "MINT NOW"}
              </button>
            </div>
            <div className="mint-btn-container">
              <button
                className={`mint-increment-btn ${
                  amount === 1 ? "mint-amount-selected" : ""
                } ${purchaseLimit >= 1 ? "" : "mint-amount-nope"} `}
                onClick={() => crement(1)}
              >
                1
              </button>
              <button
                className={`mint-increment-btn ${
                  amount === 2 ? "mint-amount-selected" : ""
                } ${purchaseLimit >= 2 ? "" : "mint-amount-nope"} `}
                onClick={() => crement(2)}
              >
                2
              </button>
              <button
                className={`mint-increment-btn ${
                  amount === 3 ? "mint-amount-selected" : ""
                } ${purchaseLimit >= 3 ? "" : "mint-amount-nope"} `}
                onClick={() => crement(3)}
              >
                3
              </button>
              <button
                className={`mint-increment-btn ${
                  amount === 4 ? "mint-amount-selected" : ""
                } ${purchaseLimit >= 4 ? "" : "mint-amount-nope"} `}
                onClick={() => crement(4)}
              >
                4
              </button>
              <button
                className={`mint-increment-btn ${
                  amount === 5 ? "mint-amount-selected" : ""
                } ${purchaseLimit >= 5 ? "" : "mint-amount-nope"} `}
                onClick={() => crement(5)}
              >
                5
              </button>
              <button
                className={`mint-increment-btn ${
                  amount === 6 ? "mint-amount-selected" : ""
                } ${purchaseLimit >= 6 ? "" : "mint-amount-nope"} `}
                onClick={() => crement(6)}
              >
                6
              </button>
            </div>
          </div>
        ) : (
          <div className="mint-business">
            <div
              className="mint-help-icon"
              onClick={() => setShowModal(true)}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <span>Trouble connecting your wallet? </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                Click here!
                <img className="mint-help-button" src={help} />
              </span>
            </div>
            <button
              className="mint-wallet-option"
              onClick={() => activate(Injected)}
            >
              <div>
                <img src={MMIcon} className="wallet-icon" /> Metamask
              </div>
            </button>
            <button
              className="mint-wallet-option"
              onClick={() => activate(CoinbaseWallet)}
            >
              <div>
                {" "}
                <img src={CBIcon} className="wallet-icon" /> CoinbaseWallet{" "}
              </div>
            </button>
            <button className="mint-wallet-option" onClick={() => activate(WC)}>
              <div>
                {" "}
                <div
                  style={{
                    padding: "0.2em 0em",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <img src={WCIcon} className="wallet-icon" /> WalletConnect
                </div>
                <div
                  style={{
                    padding: "0.2em 0em",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <img src={MMIcon} className="wallet-icon" /> Metamask{" "}
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
      <div className="word-bg">
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>{" "}
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>{" "}
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>{" "}
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>{" "}
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>{" "}
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>{" "}
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>{" "}
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>{" "}
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>{" "}
        <span className="down">
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span>
          HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
        <span className="up">
          LES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES HOODLES
          HOODLES HOODLES HOODLES HOODLES <br />
        </span>
      </div>
      <Modal
        open={showModal}
        setOpen={setShowModal}
        page={0}
        setPage={() => {}}
        content={modalContent}
      />
    </section>
  );
};

export default MintNowPage;
