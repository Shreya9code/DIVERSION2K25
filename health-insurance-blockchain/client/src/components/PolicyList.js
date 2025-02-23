import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Web3Context } from '../contexts/Web3Context';

const PolicyList = () => {
  const { web3, accounts, contract } = useContext(Web3Context);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const loadPolicies = async () => {
      if (!contract || !accounts[0]) return;
      
      try {
        const owner = await contract.methods.owner().call();
        const currentUserIsOwner = owner.toLowerCase() === accounts[0].toLowerCase();
        setIsOwner(currentUserIsOwner);
        
        if (currentUserIsOwner) {
          const policyCount = Number(await contract.methods.nextPolicyId().call());
          const policiesArray = [];
          
          for (let i = 1; i < policyCount; i++) {
            try {
              const policy = await contract.methods.policies(i).call();
              policiesArray.push({ id: i, ...policy });
            } catch (err) {
              console.log(`Policy ${i} not found`);
            }
          }
          
          setPolicies(policiesArray);
        } else {
          const userPolicyIds = await contract.methods.getPoliciesForUser(accounts[0]).call();
          const policiesArray = await Promise.all(
            userPolicyIds.map(async (id) => {
              const policy = await contract.methods.policies(Number(id)).call();
              return { id: Number(id), ...policy };
            })
          );
          
          setPolicies(policiesArray);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load policies');
      } finally {
        setLoading(false);
      }
    };

    loadPolicies();
  }, [contract, accounts]);

  const isPolicyActive = (policy) => {
    return policy.isActive && Number(policy.expiryDate) * 1000 > Date.now();
  };

  if (loading) {
    return <div className="text-center p-5"><div className="spinner-border"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (policies.length === 0) {
    return (
      <div className="card p-4">
        <h2>Policies</h2>
        <div className="alert alert-info">
          No policies found. 
          {!isOwner && <Link to="/policies/create" className="alert-link ms-2">Create a new policy</Link>}
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Policies</h2>
        {isOwner && (
          <Link to="/policies/create" className="btn btn-primary">Create New Policy</Link>
        )}
      </div>
      
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Holder</th>
              <th>Premium (ETH)</th>
              <th>Coverage (ETH)</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td>{policy.id}</td>
                <td>
                  <span className="address-display">
                    {`${policy.holder.substring(0, 6)}...${policy.holder.substring(policy.holder.length - 4)}`}
                  </span>
                </td>
                <td>{web3.utils.fromWei(policy.premium.toString(), 'ether')}</td>
                <td>{web3.utils.fromWei(policy.coverageAmount.toString(), 'ether')}</td>
                <td>{new Date(Number(policy.expiryDate) * 1000).toLocaleDateString()}</td>
                <td>
                  <span className={`policy-status ${isPolicyActive(policy) ? 'status-active' : 'status-expired'}`}>
                    {isPolicyActive(policy) ? 'Active' : 'Expired'}
                  </span>
                </td>
                <td>
                  <Link to={`/policies/${policy.id}`} className="btn btn-sm btn-outline-primary">Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolicyList;