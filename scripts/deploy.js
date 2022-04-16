
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const _name = "Hoodles";
    const _symbol = "Hoodles";
    const _beneficiary = "0x6472A63Da4581Dd9090faF7B92C09282b94a06EA";
    const _hoodlesTreasury = "0x6472A63Da4581Dd9090faF7B92C09282b94a06EA";
    const  _initialTokenURI = "https://ipfs.io/ipfs/";
    const  _hiddenTokenURI = "https://ipfs.io/ipfs/";
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Token = await ethers.getContractFactory("Hoodles");
    const token = await Token.deploy(_name, _symbol, _beneficiary, _hoodlesTreasury, _initialTokenURI, _hiddenTokenURI);
  
    console.log("Hoodles address:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });