'use client';

export default function LoginSection({ onLogin }) {
  return (
    <div className="login-section">
      <h2>Welcome to the Event! 🎉</h2>
      <p className="description">
        Sign in to claim your attendance NFT on Rootstock.
      </p>
      <p className="subtext">
        No wallet? No problem. We'll create one for you instantly.
      </p>
      <button onClick={onLogin} className="login-button">
        🎟️ Sign In to Claim Ticket
      </button>
      <div className="info-box">
        <p>✨ Email or Google login</p>
        <p>🔒 Wallet created automatically</p>
        <p>⚡ Bitcoin L2 security</p>
      </div>
    </div>
  );
}