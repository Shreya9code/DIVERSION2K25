//health-insurance-blockchain\client\src\components\ClaimList.js

import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

const ClaimList = () => {
  const { web3, accounts, contract } = useContext(Web3Context);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [processingClaim, setProcessingClaim] = useState(null);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState('');

  // Status labels and styling
  const claimStatuses = ['Submitted', 'UnderReview', 'Approved', 'Rejected', 'Paid'];
  const statusClasses = {
    0: 'claim-submitted',
    1: 'claim-under-review',
    2: 'claim-approved',
    3: 'claim-rejected',
    4: 'claim-paid'
  };

  useEffect(() => {
    const loadClaims = async () => {
      if (!contract) {
        console.log("⚠️ Contract is not initialized!");
        return;
      }
      if (!accounts || accounts.length === 0) {
        console.log("⚠️ Accounts not found!");
        return;
      }
  
      try {
        console.log("🔄 Fetching contract owner...");
        const owner = await contract.methods.owner().call();
        const currentUserIsOwner = owner.toLowerCase() === accounts[0].toLowerCase();
        setIsOwner(currentUserIsOwner);
        console.log(`✅ Contract owner: ${owner}`);
        
        console.log("🔄 Fetching claim count...");
        const claimCount = await contract.methods.nextClaimId().call();
        console.log(`✅ Total claims: ${claimCount}`);
        
        const claimsArray = [];
        
        for (let i = 1; i < claimCount; i++) {
          try {
            console.log(`🔄 Fetching claim ${i}...`);
            const claim = await contract.methods.claims(i).call();
            console.log(`✅ Claim ${i}:`, claim);
            
            const policy = await contract.methods.policies(claim.policyId).call();
            
            if (currentUserIsOwner || policy.holder.toLowerCase() === accounts[0].toLowerCase()) {
              claimsArray.push({
                id: i,
                ...claim,
                policyHolder: policy.holder
              });
            }
          } catch (err) {
            console.log(`⚠️ Claim ${i} not found or inaccessible:`, err);
          }
        }
        
        setClaims(claimsArray);
      } catch (err) {
        console.error("❌ Error loading claims:", err);
        setError('Failed to load claims');
      } finally {
        setLoading(false);
      }
    };
  
    loadClaims();
  }, [contract, accounts, statusUpdateSuccess]);
  

  const updateClaimStatus = async (claimId, newStatus) => {
    setProcessingClaim(claimId);
    setStatusUpdateSuccess('');
    
    try {
      await contract.methods.updateClaimStatus(claimId, newStatus).send({ from: accounts[0] });
      setStatusUpdateSuccess(`Claim #${claimId} status updated successfully`);
    } catch (err) {
      console.error(err);
      setError('Failed to update claim status: ' + (err.message || 'Unknown error'));
    } finally {
      setProcessingClaim(null);
    }
  };

  if (loading) {
    return <div className="text-center p-5"><div className="spinner-border"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (claims.length === 0) {
    return (
      <div className="card p-4">
        <h2>Claims</h2>
        <div className="alert alert-info">No claims found.</div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <h2>Claims</h2>
      
      {statusUpdateSuccess && (
        <div className="alert alert-success">{statusUpdateSuccess}</div>
      )}
      
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Policy ID</th>
              <th>Treatment</th>
              <th>Amount (ETH)</th>
              <th>Status</th>
              {isOwner && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.policyId}</td>
                <td>
                  {claim.treatmentDescription.length > 30 
                    ? `${claim.treatmentDescription.substring(0, 30)}...` 
                    : claim.treatmentDescription}
                </td>
                <td>{web3.utils.fromWei(claim.amount, 'ether')}</td>
                <td>
                  <span className={`claim-status ${statusClasses[claim.status]}`}>
                    {claimStatuses[claim.status]}
                  </span>
                </td>
                {isOwner && (
                  <td>
                    <div className="dropdown">
                      <button 
                        className="btn btn-sm btn-outline-primary dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown"
                        disabled={processingClaim === claim.id}
                      >
                        {processingClaim === claim.id ? 'Processing...' : 'Update Status'}
                      </button>
                      <ul className="dropdown-menu">
                        {claimStatuses.map((status, index) => (
                          <li key={index}>
                            <button 
                              className="dropdown-item" 
                              onClick={() => updateClaimStatus(claim.id, index)}
                              disabled={Number(claim.status) === index}
                            >
                              {status}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimList;