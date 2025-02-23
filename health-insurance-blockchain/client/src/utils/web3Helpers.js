import Web3 from 'web3';
import HealthInsurance from '../contracts/HealthInsurance.json';

/**
 * Initialize Web3 with MetaMask or other provider
 * @returns {Object} Web3 instance
 */
export const initWeb3 = async () => {
  let web3Instance;

  // Modern dapp browsers
  if (window.ethereum) {
    web3Instance = new Web3(window.ethereum);
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error("User denied account access");
      throw new Error("User denied account access");
    }
  }
  // Legacy dapp browsers
  else if (window.web3) {
    web3Instance = new Web3(window.web3.currentProvider);
  }
  // Fallback - local provider
  else {
    console.warn("No web3 detected. Falling back to local node");
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    web3Instance = new Web3(provider);
  }
  
  return web3Instance;
};

/**
 * Get user accounts from Web3
 * @param {Object} web3 - Web3 instance
 * @returns {Array} Array of accounts
 */
export const getAccounts = async (web3) => {
  try {
    const accounts = await web3.eth.getAccounts();
    return accounts;
  } catch (error) {
    console.error("Error getting accounts:", error);
    throw error;
  }
};

/**
 * Get network ID from Web3
 * @param {Object} web3 - Web3 instance
 * @returns {Number} Network ID
 */
export const getNetworkId = async (web3) => {
  try {
    const networkId = await web3.eth.net.getId();
    return networkId;
  } catch (error) {
    console.error("Error getting network ID:", error);
    throw error;
  }
};

/**
 * Get contract instance
 * @param {Object} web3 - Web3 instance
 * @param {Number} networkId - Network ID
 * @returns {Object} Contract instance
 */
export const getContractInstance = async (web3, networkId) => {
  try {
    // Check if the contract is deployed on this network
    const deployedNetwork = HealthInsurance.networks[networkId];
    if (!deployedNetwork) {
      throw new Error(`Contract not deployed on network ID: ${networkId}`);
    }
    
    const instance = new web3.eth.Contract(
      HealthInsurance.abi,
      deployedNetwork.address
    );
    
    return instance;
  } catch (error) {
    console.error("Error getting contract instance:", error);
    throw error;
  }
};

/**
 * Format ETH value with specified decimals
 * @param {String|Number} value - Wei value
 * @param {Number} decimals - Number of decimals
 * @returns {String} Formatted ETH value
 */
export const formatEther = (value, decimals = 4) => {
  try {
    const etherValue = Web3.utils.fromWei(value.toString(), 'ether');
    return parseFloat(etherValue).toFixed(decimals);
  } catch (error) {
    console.error("Error formatting ether value:", error);
    return "0.0000";
  }
};

/**
 * Convert ETH to Wei
 * @param {String|Number} eth - ETH value
 * @returns {String} Wei value
 */
export const toWei = (eth) => {
  try {
    return Web3.utils.toWei(eth.toString(), 'ether');
  } catch (error) {
    console.error("Error converting to wei:", error);
    throw error;
  }
};

/**
 * Check if MetaMask is installed
 * @returns {Boolean} true if MetaMask is installed
 */
export const isMetaMaskInstalled = () => {
  return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
};

/**
 * Add event listener for account changes
 * @param {Function} callback - Callback function
 */
export const listenForAccountChanges = (callback) => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      callback(accounts);
    });
  }
};

/**
 * Add event listener for network changes
 * @param {Function} callback - Callback function
 */
export const listenForNetworkChanges = (callback) => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', (networkId) => {
      callback(parseInt(networkId, 16));
    });
  }
};