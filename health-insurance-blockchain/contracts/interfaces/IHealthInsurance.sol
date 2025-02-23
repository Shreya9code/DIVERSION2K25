// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IHealthInsurance
 * @dev Interface for the HealthInsurance contract
 */
interface IHealthInsurance {
    // Structs
    struct Policy {
        uint256 id;
        address policyholder;
        uint256 premium;
        uint256 coverageAmount;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
        string coverageDetails;
        string[] conditions;
    }
    
    struct Claim {
        uint256 id;
        uint256 policyId;
        address policyholder;
        address provider;
        uint256 amount;
        string description;
        string evidence;
        ClaimStatus status;
        uint256 submissionDate;
        uint256 processedDate;
    }
    
    // Enums
    enum ClaimStatus { Submitted, UnderReview, Approved, Rejected, Paid }
    enum UserRole { Unregistered, Policyholder, Provider, Insurer }
    
    // Events
    event UserRegistered(address indexed user, UserRole role);
    event PolicyCreated(uint256 indexed policyId, address indexed policyholder, uint256 premium, uint256 coverageAmount);
    event PolicyUpdated(uint256 indexed policyId, bool isActive);
    event PremiumPaid(uint256 indexed policyId, address indexed policyholder, uint256 amount);
    event ClaimSubmitted(uint256 indexed claimId, uint256 indexed policyId, address indexed policyholder, uint256 amount);
    event ClaimStatusUpdated(uint256 indexed claimId, ClaimStatus status);
    event ClaimPaid(uint256 indexed claimId, address indexed policyholder, uint256 amount);
    
    // User Management Functions
    function registerPolicyholder() external;
    function registerProvider() external;
    function registerInsurer() external;
    function getUserRole(address user) external view returns (UserRole);
    
    // Policy Management Functions
    function createPolicy(
        uint256 premium,
        uint256 coverageAmount,
        uint256 duration,
        string calldata coverageDetails,
        string[] calldata conditions
    ) external returns (uint256);
    
    function getPolicy(uint256 policyId) external view returns (Policy memory);
    function getPoliciesForPolicyholder(address policyholder) external view returns (uint256[] memory);
    function activatePolicy(uint256 policyId) external;
    function deactivatePolicy(uint256 policyId) external;
    function payPremium(uint256 policyId) external payable;
    function isPolicyActive(uint256 policyId) external view returns (bool);
    
    // Claim Management Functions
    function submitClaim(
        uint256 policyId,
        uint256 amount,
        string calldata description,
        string calldata evidence
    ) external returns (uint256);
    
    function reviewClaim(uint256 claimId, ClaimStatus newStatus) external;
    function processClaim(uint256 claimId) external;
    function getClaim(uint256 claimId) external view returns (Claim memory);
    function getClaimsForPolicy(uint256 policyId) external view returns (uint256[] memory);
    function getClaimsForPolicyholder(address policyholder) external view returns (uint256[] memory);
    
    // Fund Management Functions
    function getContractBalance() external view returns (uint256);
    function withdrawFunds(uint256 amount) external;
}