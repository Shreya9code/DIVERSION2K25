import React, { useState, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

const ClaimSubmission = () => {
  const { web3, accounts, contract } = useContext(Web3Context);
  const [policyId, setPolicyId] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ Check if Web3, accounts, and contract are loaded before continuing
  if (!web3 || !accounts || !contract) {
    return (
      <div className="alert alert-warning">
        ⚠️ Web3 is not initialized. Please connect your wallet.
      </div>
    );
  }

  const submitClaim = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    console.log("🔍 Submitting claim with values:", { policyId, description, amount });

    try {
      const policyIdNum = parseInt(policyId);
      if (isNaN(policyIdNum) || policyIdNum <= 0) {
        throw new Error('❌ Invalid Policy ID. Please enter a valid number.');
      }

      const amountWei = web3.utils.toWei(amount, 'ether');

      // ✅ Ensure contract is properly initialized
      if (!contract.methods) {
        throw new Error('⚠️ Smart contract is not properly loaded.');
      }

      // ✅ Call contract method to submit claim
      const result = await contract.methods
        .submitClaim(policyIdNum, description, amountWei)
        .send({ from: accounts[0] });

      console.log("✅ Claim submitted successfully!", result);

      const claimId = result.events.ClaimSubmitted.returnValues.claimId;
      setSuccess(`🎉 Claim submitted successfully! Claim ID: ${claimId}`);

      // Reset form
      setPolicyId('');
      setDescription('');
      setAmount('');
    } catch (err) {
      console.error("❌ Error submitting claim:", err);
      setError(err.message || '⚠️ Failed to submit claim. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 my-4">
      <h2>Submit a Claim</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={submitClaim}>
        <div className="mb-3">
          <label className="form-label">Policy ID:</label>
          <input
            type="number"
            className="form-control"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Treatment Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Claim Amount (ETH):</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Claim'}
        </button>
      </form>
    </div>
  );
};

export default ClaimSubmission;
