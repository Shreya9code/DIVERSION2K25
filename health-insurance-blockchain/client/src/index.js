import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './components/App.css';
import App from './components/App';
import { Web3Provider } from './contexts/Web3Context';
import { AuthProvider } from './contexts/AuthContext';

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <Router>
      <Web3Provider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Web3Provider>
    </Router>
  </React.StrictMode>
);