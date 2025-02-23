//health-insurance-blockchain\truffle-config.js

require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    sepolia: {
        provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, process.env.SEPOLIA_RPC_URL),
        network_id: 11155111,
        gas: 5000000,  // Lower gas limit
        confirmations: 2,
        timeoutBlocks: 200,
        skipDryRun: true,
        networkCheckTimeout: 10000,  // Add this
        pollingInterval: 10000       // Add this
    }
  },
  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
};
