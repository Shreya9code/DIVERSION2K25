//health-insurance-blockchain\client\src\contexts\Web3Context.js

import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import HealthInsurance from '../contracts/HealthInsurance.json';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWeb3(web3Instance);
            
            // Get network ID
            const networkId = await web3Instance.eth.net.getId();
            setNetworkId(networkId);
            
            // Get accounts
            const accounts = await web3Instance.eth.getAccounts();
            setAccounts(accounts);
            
            // Get the contract instance
            const deployedNetwork = HealthInsurance.networks[networkId];
            if (deployedNetwork && deployedNetwork.address) {
              const contractInstance = new web3Instance.eth.Contract(
                HealthInsurance.abi,
                deployedNetwork.address
              );
              setContract(contractInstance);
            } else {
              setError('Contract not deployed on the detected network');
            }
          } catch (error) {
            setError('Failed to connect to MetaMask');
            console.error(error);
          }
        } else {
          setError('MetaMask is not installed');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to initialize Web3');
      } finally {
        setLoading(false);
      }
    };

    initWeb3();
    
    // Setup event listeners for account and network changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccounts(accounts);
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    
    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{ web3, accounts, contract, networkId, loading, error }}>
      {children}
    </Web3Context.Provider>
  );
};