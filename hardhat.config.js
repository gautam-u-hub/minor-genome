require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/E7K1NaKG5ss1HaH-0-ZOwH7sPe3Rvn6O',
      accounts:['647aa47246531ee912231714d873d1d9dda8eb351471907d1c77538ea3e21877']
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
