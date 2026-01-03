'use client';

import { useState, useEffect } from 'react';
import { useWallets } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/privy';

export default function MintingSection({ userAddress }) {
  const { wallets } = useWallets();
  const [isMinting, setIsMinting] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState(null);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);

  // 🔍 RELAXED FILTER: Find *any* Privy wallet, don't worry about chainType yet
  const embeddedWallet = wallets.find(
    wallet => wallet.walletClientType === 'privy'
  );

  const handleMint = async () => {
    if (!embeddedWallet) {
      setError("Wallet signer not ready. Please refresh the page.");
      return;
    }

    setIsMinting(true);
    setError(null);

    try {
      // 1. Force Switch to Rootstock Testnet
      await embeddedWallet.switchChain(31); 

      // 2. Get Provider & Signer
      const ethereumProvider = await embeddedWallet.getEthereumProvider();
      const provider = new ethers.providers.Web3Provider(ethereumProvider);
      const signer = provider.getSigner();

      // 3. Connect Contract
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const address = await signer.getAddress();
      console.log("Minting to:", address);

      // ---------------------------------------------------------
      // 🛠️ THE FIX: Force Legacy Transaction (Type 0)
      // ---------------------------------------------------------
      
      // manually get the current gas price from the network
      const gasPrice = await provider.getGasPrice();
      
      // Send transaction with EXPLICIT overrides
      const tx = await contract.mintTicket(address, {
        gasLimit: 600000,      // Hard limit to skip estimation steps
        gasPrice: gasPrice,    // Explicit price (solves the $0.00 issue)
        type: 0                // 0 = Legacy transaction (No EIP-1559)
      });
      
      console.log("Tx sent:", tx.hash);
      setTxHash(tx.hash);

      const receipt = await tx.wait();
      
      // 5. Get Token ID
      const tokenId = receipt.events?.[0]?.args?.tokenId?.toString() || 
                      receipt.events?.[0]?.args?.[0]?.toString() || 
                      "1";
      
      setMintedTokenId(tokenId);
      
    } catch (err) {
      console.error("Minting error:", err);
      // Detailed error logging
      if (err.message.includes("user rejected")) {
        setError("Transaction rejected.");
      } else {
        setError("Mint failed: " + (err.reason || err.message));
      }
    } finally {
      setIsMinting(false);
    }
  };
  // SUCCESS STATE
  if (mintedTokenId) {
    return (
      <div className="nft-section success">
        <div className="success-content">
          <h3>🎉 Success!</h3>
          <p>You've claimed your TicketToWeb3 NFT!</p>
          <div className="token-info">
            <p className="token-id">Token ID: #{mintedTokenId}</p>
            {txHash && (
              <p className="tx-hash">
                Transaction: {txHash.substring(0, 10)}...
              </p>
            )}
          </div>
          <a 
            href={`https://explorer.testnet.rsk.co/address/${userAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="explorer-link"
          >
            View on Rootstock Explorer →
          </a>
        </div>
      </div>
    );
  }

  // MINTING STATE
  return (
    <div className="nft-section">
      <h3>🎫 Claim Your NFT Ticket</h3>
      <p>Mint your proof-of-attendance NFT on Rootstock (Bitcoin L2)</p>

      {/* User Address Display (uses prop, so it always shows if parent has it) */}
      <div className="wallet-info" style={{background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
        <p style={{fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem'}}>Your Wallet:</p>
        <p style={{fontFamily: 'monospace', fontSize: '0.9rem', wordBreak: 'break-all'}}>
          {userAddress || "Loading..."}
        </p>
      </div>

      {error && (
        <div className="error-box">
          <p>❌ {error}</p>
        </div>
      )}
      
      {/* The Button */}
      <button 
        onClick={handleMint} 
        // Only disable if minting. If wallet is missing, we show "Retry/Refresh" logic or just let them click to trigger error
        disabled={isMinting || !embeddedWallet}
        className="mint-button"
        style={{ opacity: embeddedWallet ? 1 : 0.6 }}
      >
        {isMinting ? (
          <>
            <span className="spinner"></span>
            Minting...
          </>
        ) : !embeddedWallet ? (
          'Loading Signer... (Please Refresh)'
        ) : (
          'Claim NFT Ticket'
        )}
      </button>
      
      <div className="mint-info">
        <p>✓ Secured by Bitcoin mining</p>
        <p>✓ ~30 second confirmation</p>
        <p>✓ Minimal gas fees</p>
      </div>
    </div>
  );
}