// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthInsurance {
    struct Policy {
        address holder;
        uint256 premium;
        uint256 coverageAmount;
        uint256 expiryDate;
        bool isActive;
    }
    
    struct Claim {
        uint256 policyId;
        string treatmentDescription;
        uint256 amount;
        ClaimStatus status;
    }
    
    enum ClaimStatus { Submitted, UnderReview, Approved, Rejected, Paid }
    
    mapping(uint256 => Policy) public policies;
    mapping(uint256 => Claim) public claims;
    mapping(address => uint256[]) public userPolicies;
    
    uint256 public nextPolicyId = 1;
    uint256 public nextClaimId = 1;
    address public owner;
    
    event PolicyCreated(uint256 indexed policyId, address indexed holder);
    event PremiumPaid(uint256 indexed policyId, uint256 amount);
    event ClaimSubmitted(uint256 indexed claimId, uint256 indexed policyId);
    event ClaimStatusChanged(uint256 indexed claimId, ClaimStatus status);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    modifier onlyPolicyHolder(uint256 _policyId) {
        require(msg.sender == policies[_policyId].holder, "Only the policy holder can call this function");
        _;
    }
    
    function createPolicy(address _holder, uint256 _premium, uint256 _coverageAmount, uint256 _durationDays) 
        external onlyOwner returns (uint256) {
        uint256 policyId = nextPolicyId++;
        
        policies[policyId] = Policy({
            holder: _holder,
            premium: _premium,
            coverageAmount: _coverageAmount,
            expiryDate: block.timestamp + (_durationDays * 1 days),
            isActive: true
        });
        
        userPolicies[_holder].push(policyId);
        emit PolicyCreated(policyId, _holder);
        return policyId;
    }
    
    function payPremium(uint256 _policyId) external payable {
        Policy storage policy = policies[_policyId];
        require(policy.isActive, "Policy is not active");
        require(msg.value == policy.premium, "Invalid premium amount");
        
        policy.expiryDate = block.timestamp + 30 days;
        
        emit PremiumPaid(_policyId, msg.value);
    }
    
    function submitClaim(uint256 _policyId, string calldata _description, uint256 _amount) 
        external onlyPolicyHolder(_policyId) returns (uint256) {
        Policy storage policy = policies[_policyId];
        require(policy.isActive, "Policy is not active");
        require(block.timestamp <= policy.expiryDate, "Policy has expired");
        require(_amount <= policy.coverageAmount, "Claim amount exceeds coverage");
        
        uint256 claimId = nextClaimId++;
        
        claims[claimId] = Claim({
            policyId: _policyId,
            treatmentDescription: _description,
            amount: _amount,
            status: ClaimStatus.Submitted
        });
        
        emit ClaimSubmitted(claimId, _policyId);
        return claimId;
    }
    
    function updateClaimStatus(uint256 _claimId, ClaimStatus _status) external onlyOwner {
        Claim storage claim = claims[_claimId];
        require(claim.policyId > 0, "Claim does not exist");
        
        claim.status = _status;
        
        if (_status == ClaimStatus.Paid) {
            processClaim(_claimId);
        }
        
        emit ClaimStatusChanged(_claimId, _status);
    }
    
    function processClaim(uint256 _claimId) internal {
        Claim storage claim = claims[_claimId];
        Policy storage policy = policies[claim.policyId];
        
        require(policy.coverageAmount >= claim.amount, "Insufficient coverage");
        
        policy.coverageAmount -= claim.amount;
        
        payable(policy.holder).transfer(claim.amount);
    }
    
    function getPoliciesForUser(address _user) external view returns (uint256[] memory) {
        return userPolicies[_user];
    }
    
    function getContractBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }
    
    function fundContract() external payable onlyOwner {}
}
