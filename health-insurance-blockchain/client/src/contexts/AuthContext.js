//health-insurance-blockchain\client\src\contexts\AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Web3Context } from './Web3Context';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { web3, accounts } = useContext(Web3Context);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null); // 'policyholder', 'provider', 'insurer'

  useEffect(() => {
    if (web3 && accounts.length > 0) {
      setCurrentUser(accounts[0]);

      const checkUserType = async () => {
        try {
          // TODO: Replace with actual contract methods for user type validation
          const address = accounts[0].toLowerCase();
          if (address.endsWith('1') || address.endsWith('3')) {
            setUserType('policyholder');
          } else if (address.endsWith('5') || address.endsWith('7')) {
            setUserType('provider');
          } else if (address.endsWith('9') || address.endsWith('0')) {
            setUserType('insurer');
          } else {
            setUserType('unregistered');
          }
        } catch (error) {
          console.error("Error determining user type:", error);
          setUserType('unregistered');
        }
        setLoading(false);
      };

      checkUserType();
    } else {
      setCurrentUser(null);
      setUserType(null);
      setLoading(false);
    }
  }, [web3, accounts]);

  const registerUser = async (userTypeToRegister) => {
    if (!web3 || !currentUser) return false;

    try {
      // TODO: Replace with contract interaction for registering user
      setUserType(userTypeToRegister);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const value = {
    currentUser,
    userType,
    loading,
    registerUser,
    isAuthenticated: !!currentUser,
    isPolicyholder: userType === 'policyholder',
    isProvider: userType === 'provider',
    isInsurer: userType === 'insurer',
    isUnregistered: userType === 'unregistered',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
