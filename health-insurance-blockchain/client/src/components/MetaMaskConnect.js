import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../contexts/Web3Context';

const MetaMaskConnect = () => {
  const { web3, accounts, loading, error } = useContext(Web3Context);
  const [userAddress, setUserAddress] = useState('');

  const metaMaskAddress = "0x6c3145325ccD884472F25387991D3396eFa8DEEA".toLowerCase(); // Your wallet address

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setUserAddress(accounts[0]);
    }
  }, [accounts]);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.location.reload();
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this application.");
    }
  };

  // Format address to show first 6 and last 4 chars
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (loading) {
    return (
      <div className="metamask-banner">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span>Connecting to wallet...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="metamask-banner bg-light">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
            <strong>Connection Error: </strong>
            <span>{error}</span>
          </div>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={connectToMetaMask}
          >
            Connect to MetaMask
          </button>
        </div>
      </div>
    );
  }

  if (!web3 || !accounts || accounts.length === 0) {
    return (
      <div className="metamask-banner bg-light">
        <div className="d-flex align-items-center justify-content-between w-100">
          <span>Please connect your wallet to use the application</span>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={connectToMetaMask}
          >
            Connect to MetaMask
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="metamask-banner">
      <div className="d-flex align-items-center justify-content-between w-100">
        <div>
          <strong>Connected: </strong>
          <span className="address-display">{formatAddress(userAddress)}</span>
          {userAddress.toLowerCase() === metaMaskAddress && (
            <span className="badge bg-info ms-2">Verified</span>
          )}
        </div>
        <div className="badge bg-success">Connected</div>
      </div>
    </div>
  );
};

export default MetaMaskConnect;
