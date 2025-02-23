import React, { useState, useContext, useEffect } from 'react';
import { Web3Context } from '../contexts/Web3Context';

const PolicyCreation = () => {
  const { web3, accounts, contract } = useContext(Web3Context);
  const [holderAddress, setHolderAddress] = useState('');
  const [premium, setPremium] = useState('');
  const [coverage, setCoverage] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Ensure contract is loaded before interacting with it
  useEffect(() => {
    if (!web3 || !accounts || !contract) {
      setError("Web3 or contract is not initialized. Please check your connection.");
    }
  }, [web3, accounts, contract]);

  const createPolicy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate Web3 and contract
      if (!web3) throw new Error("Web3 is not initialized.");
      if (!contract) throw new Error("Contract is not available.");
      if (!accounts || accounts.length === 0) throw new Error("No connected account found.");

      // Validate inputs
      if (!web3.utils.isAddress(holderAddress)) {
        throw new Error('Invalid Ethereum address');
      }

      const premiumWei = web3.utils.toWei(premium, 'ether');
      const coverageWei = web3.utils.toWei(coverage, 'ether');
      const durationDays = parseInt(duration);

      if (isNaN(durationDays) || durationDays <= 0) {
        throw new Error('Invalid duration');
      }

      // Call contract method
      const result = await contract.methods
        .createPolicy(holderAddress, premiumWei, coverageWei, durationDays)
        .send({ from: accounts[0] });

      const policyId = result.events.PolicyCreated?.returnValues?.policyId || "Unknown";
      setSuccess(`Policy created successfully! Policy ID: ${policyId}`);
      
      // Reset form
      setHolderAddress('');
      setPremium('');
      setCoverage('');
      setDuration('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create policy');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 my-4">
      <h2>Create New Policy</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={createPolicy}>
        <div className="mb-3">
          <label className="form-label">Holder Address:</label>
          <input
            type="text"
            className="form-control"
            value={holderAddress}
            onChange={(e) => setHolderAddress(e.target.value)}
            placeholder="0x..."
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Premium (ETH):</label>
          <input
            type="number"
            className="form-control"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Coverage Amount (ETH):</label>
          <input
            type="number"
            className="form-control"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            step="0.1"
            min="0"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Duration (days):</label>
          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !web3 || !contract}
        >
          {loading ? 'Processing...' : 'Create Policy'}
        </button>
      </form>
    </div>
  );
};

export default PolicyCreation;
