/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = "dcfcb3154f52ba92f8813b9a2ee29c236261df3de39625e17144f84c4fbb8a0f";
// const PRIVATE_KEY = "2213a33c0a006f7ef10f1a8490798ffcecee31c8bb106c80684ac570fca39b20";
const RPC_URL = "https://rpc.ankr.com/polygon_mumbai";
module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
      chainId: 80001,
    },
    polygon_mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
