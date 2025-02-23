import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Web3Context } from '../contexts/Web3Context';

const PolicyDetails = () => {
  const { id } = useParams();
  const { web3, accounts, contract } = useContext(Web3Context);
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [payingPremium, setPayingPremium] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState('');

  useEffect(() => {
    const loadPolicy = async () => {
      if (!contract || !id) return;
      
      try {
        const policyData = await contract.methods.policies(id).call();
        setPolicy({
          id: id,
          ...policyData
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load policy details');
      } finally {
        setLoading(false);
      }
    };

    loadPolicy();
  }, [contract, id, paymentSuccess]);

  const isPolicyActive = (policy) => {
    return policy.isActive && Number(policy.expiryDate) * 1000 > Date.now();
  };

  const canPayPremium = (policy) => {
    return policy.holder.toLowerCase() === accounts[0].toLowerCase();
  };

  const payPremium = async () => {
    if (!policy) return;
    
    setPayingPremium(true);
    setError('');
    setPaymentSuccess('');
    
    try {
      await contract.methods.payPremium(policy.id).send({ 
        from: accounts[0],
        value: policy.premium
      });
      setPaymentSuccess('Premium paid successfully! Policy has been extended.');
    } catch (err) {
      console.error(err);
      setError('Failed to pay premium: ' + (err.message || 'Unknown error'));
    } finally {
      setPayingPremium(false);
    }
  };

  if (loading) {
    return <div className="text-center p-5"><div className="spinner-border"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!policy) {
    return <div className="alert alert-warning">Policy not found</div>;
  }

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Policy Details</h2>
        <Link to="/policies" className="btn btn-outline-secondary">Back to Policies</Link>
      </div>
      
      {paymentSuccess && <div className="alert alert-success">{paymentSuccess}</div>}
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">Policy Information</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Policy ID:</strong> {policy.id}
              </div>
              <div className="mb-3">
                <strong>Status:</strong> 
                <span className={`policy-status ms-2 ${isPolicyActive(policy) ? 'status-active' : 'status-expired'}`}>
                  {isPolicyActive(policy) ? 'Active' : 'Expired'}
                </span>
              </div>
              <div className="mb-3">
                <strong>Policy Holder:</strong> 
                <div className="address-display mt-1">{policy.holder}</div>
              </div>
              <div className="mb-3">
                <strong>Expiry Date:</strong> {new Date(Number(policy.expiryDate) * 1000).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">Financial Details</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Premium Amount:</strong> {web3.utils.fromWei(policy.premium.toString(), 'ether')} ETH
              </div>
              <div className="mb-3">
                <strong>Coverage Amount:</strong> {web3.utils.fromWei(policy.coverageAmount.toString(), 'ether')} ETH
              </div>
              
              {canPayPremium(policy) && (
                <div className="mt-4">
                  <button 
                    className="btn btn-success" 
                    onClick={payPremium}
                    disabled={payingPremium}
                  >
                    {payingPremium ? 'Processing...' : 'Pay Premium'}
                  </button>
                  <small className="d-block text-muted mt-2">
                    Paying premium will extend your policy for another 30 days.
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="d-flex gap-3 mt-3">
        <Link to="/claims/submit" className="btn btn-primary">
          Submit Claim for this Policy
        </Link>
      </div>
    </div>
  );
};

export default PolicyDetails;