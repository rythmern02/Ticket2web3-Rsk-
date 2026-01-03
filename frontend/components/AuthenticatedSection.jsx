'use client';

import { usePrivy } from '@privy-io/react-auth';
import MintingSection from './MintingSection';

export default function AuthenticatedSection({ user, onLogout }) {
  const { createWallet } = usePrivy(); // Import the manual creation hook
  const displayEmail = user.email?.address || user.google?.email || 'User';
  
  // Check if the user has an embedded wallet
  const walletAddress = user.wallet?.address;
  const hasEmbeddedWallet = !!user.wallet;

  return (
    <div className="authenticated-section">
      <div className="user-info">
        <h2>Welcome, {displayEmail}! 👋</h2>
        
        {/* Scenario 1: Wallet Exists - Show details */}
        {hasEmbeddedWallet && (
          <div className="wallet-card">
            <label>Your Rootstock Wallet:</label>
            <p className="wallet-address">
              {walletAddress}
            </p>
            <button 
              onClick={() => navigator.clipboard.writeText(walletAddress)}
              className="copy-button"
            >
              📋 Copy Address
            </button>
          </div>
        )}

        {/* Scenario 2: No Wallet - Show Manual Create Button */}
        {!hasEmbeddedWallet && (
           <div className="wallet-card warning-state">
             <label>⚠️ Wallet Setup Required</label>
             <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '1rem'}}>
               Your account is ready, but your blockchain wallet hasn't been created yet.
             </p>
             <button 
               onClick={createWallet}
               className="login-button" 
               style={{fontSize: '1rem', padding: '0.8rem'}}
             >
               🪄 Create Wallet Now
             </button>
           </div>
        )}
        
        <button onClick={onLogout} className="logout-button">
          Sign Out
        </button>
      </div>
      
      {/* Only show minting if wallet exists */}
      {hasEmbeddedWallet && <MintingSection userAddress={walletAddress} />}
    </div>
  );
}