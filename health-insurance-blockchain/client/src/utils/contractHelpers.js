// Helper functions for interacting with the smart contract

export const getPolicy = async (contract, policyId) => {
    try {
      const policy = await contract.methods.policies(policyId).call();
      return {
        id: policyId,
        holder: policy.holder,
        premium: policy.premium,
        coverageAmount: policy.coverageAmount,
        expiryDate: policy.expiryDate,
        isActive: policy.isActive
      };
    } catch (error) {
      console.error("Error fetching policy:", error);
      throw error;
    }
  };
  
  export const getClaim = async (contract, claimId) => {
    try {
      const claim = await contract.methods.claims(claimId).call();
      return {
        id: claimId,
        policyId: claim.policyId,
        treatmentDescription: claim.treatmentDescription,
        amount: claim.amount,
        status: claim.status
      };
    } catch (error) {
      console.error("Error fetching claim:", error);
      throw error;
    }
  };
  
  export const getUserPolicies = async (contract, userAddress) => {
    try {
      const policyIds = await contract.methods.getPoliciesForUser(userAddress).call();
      const policies = await Promise.all(
        policyIds.map(id => getPolicy(contract, id))
      );
      return policies;
    } catch (error) {
      console.error("Error fetching user policies:", error);
      throw error;
    }
  };
  
  export const isPolicyActive = (policy) => {
    return policy.isActive && Number(policy.expiryDate) * 1000 > Date.now();
  };
  
  export const formatWeiToEth = (web3, amountInWei) => {
    return web3.utils.fromWei(amountInWei, 'ether');
  };
  
  export const formatEthToWei = (web3, amountInEth) => {
    return web3.utils.toWei(amountInEth, 'ether');
  };
  
  export const getClaimStatusText = (statusCode) => {
    const statuses = ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Paid'];
    return statuses[statusCode] || 'Unknown';
  };
  
  export const isContractOwner = async (contract, address) => {
    try {
      const owner = await contract.methods.owner().call();
      return owner.toLowerCase() === address.toLowerCase();
    } catch (error) {
      console.error("Error checking contract owner:", error);
      return false;
    }
  };