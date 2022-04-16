import { expect } from "chai";
import { ethers } from "hardhat";

describe("Hoodle", function () {
  it("Should return correct name", async () => {
    const Hoodle = await ethers.getContractFactory("Hoodle");
    const hoodleDeployed = await Hoodle.deploy("We gucci, styll.", "HOOD");

    await hoodleDeployed.deployed();

    expect(await hoodleDeployed.name()).to.equal("We gucci, styll.");
    expect(await hoodleDeployed.symbol()).to.equal("HOOD");
  });
});
