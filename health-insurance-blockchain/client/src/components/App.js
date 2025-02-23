import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import { Web3Provider } from '../contexts/Web3Context';
import Navigation from './Navigation';
import PolicyCreation from './PolicyCreation';
import PolicyList from './PolicyList';
import PolicyDetails from './PolicyDetails';
import ClaimSubmission from './ClaimSubmission';
import ClaimList from './ClaimList';
import MetaMaskConnect from './MetaMaskConnect';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Web3Provider>
      <div className="app-container">        
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="logo-container">
            <h2 className="logo-text">MedChain</h2>
            <p className="tagline">Blockchain Health Insurance</p>
          </div>

          <div className="nav-container">
            <div className="sidebar-nav-item">
              <NavLink to="/" className={({isActive}) => 
                isActive ? "sidebar-link active" : "sidebar-link"} onClick={() => setSidebarOpen(false)}>
                <span className="nav-icon">🏠</span> Home
              </NavLink>
            </div>
            <div className="sidebar-nav-item">
              <NavLink to="/policies" className={({isActive}) => 
                isActive ? "sidebar-link active" : "sidebar-link"} onClick={() => setSidebarOpen(false)}>
                <span className="nav-icon">📄</span> Insurance Dashboard
              </NavLink>
            </div>
            <div className="sidebar-nav-item">
              <NavLink to="/claims" className={({isActive}) => 
                isActive ? "sidebar-link active" : "sidebar-link"} onClick={() => setSidebarOpen(false)}>
                <span className="nav-icon">📋</span> Claims Management
              </NavLink>
            </div>
          </div>

          <div className="wallet-section">
            <MetaMaskConnect />
          </div>
        </div>
        
        <main className="main-content">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/policies/create" element={<PolicyCreation />} />
              <Route path="/policies" element={<PolicyList />} />
              <Route path="/policies/:id" element={<PolicyDetails />} />
              <Route path="/claims/submit" element={<ClaimSubmission />} />
              <Route path="/claims" element={<ClaimList />} />
            </Routes>
          </div>
        </main>
      </div>
    </Web3Provider>
  );
}

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Decentralized Health Insurance</h1>
          <p className="hero-subtitle">
            Secure, transparent, and efficient healthcare coverage powered by blockchain technology.
          </p>
          <div className="hero-actions">
            <Link to="/policies/create" className="btn-primary">Create Policy</Link>
            <Link to="/claims/submit" className="btn-secondary">Submit Claim</Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="illustration-circle"></div>
          <div className="illustration-shape"></div>
        </div>
      </div>

      <div className="explore-section">
        <h2 className="section-title">Explore More</h2>
        <p className="section-subtitle">Manage your policies, check claims, and view policy details.</p>
        <div className="explore-links">
          <Link to="/policies" className="explore-card">
            <div className="explore-icon">📜</div>
            <div className="explore-card-content">
              <h3>View All Policies</h3>
              <p>Browse and manage your insurance policies</p>
            </div>
            <div className="explore-arrow">→</div>
          </Link>
          <Link to="/claims" className="explore-card">
            <div className="explore-icon">📑</div>
            <div className="explore-card-content">
              <h3>View All Claims</h3>
              <p>Track the status of your submitted claims</p>
            </div>
            <div className="explore-arrow">→</div>
          </Link>
          <Link to="/policies/1" className="explore-card">
            <div className="explore-icon">🔍</div>
            <div className="explore-card-content">
              <h3>View Policy Details</h3>
              <p>Review the specifics of your coverage</p>
            </div>
            <div className="explore-arrow">→</div>
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Choose MedChain?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Policies</h3>
            <p>All policies are stored on the blockchain, providing immutable records and enhanced security.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Claims</h3>
            <p>Smart contracts enable automated claim verification and faster processing times.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👁️</div>
            <h3>Transparent Process</h3>
            <p>Full visibility into policy terms and claim status throughout the entire process.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💸</div>
            <h3>Cost Effective</h3>
            <p>Reduced administrative overhead means more affordable premiums for policyholders.</p>
          </div>
        </div>
      </div>
      
      <div className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"MedChain has transformed how I manage my health insurance. The transparency and speed of claims processing is unmatched."</p>
            <div className="testimonial-author">- Sarah J., Policyholder</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"As a healthcare provider, the instant verification and payment system has significantly improved our cash flow and reduced paperwork."</p>
            <div className="testimonial-author">- Dr. Michael T., Provider</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;