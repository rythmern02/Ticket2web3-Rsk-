'use client';

import { usePrivy } from '@privy-io/react-auth';
import LoginSection from '../components/LoginSection';
import AuthenticatedSection from '../components/AuthenticatedSection';

export default function Home() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  if (!ready) {
    return (
      <div className="app loading-screen">
        <div className="spinner-large"></div>
        <p>Loading TicketToWeb3...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>🎟️ TicketToWeb3</h1>
        <p className="tagline">Your Proof-of-Attendance NFT on Bitcoin L2</p>
        <div className="badge">Powered by Privy × Rootstock</div>
      </header>

      <main>
        {!authenticated ? (
          <LoginSection onLogin={login} />
        ) : (
          <AuthenticatedSection user={user} onLogout={logout} />
        )}
      </main>

      <footer>
        <p>Built on Rootstock Testnet (Bitcoin Layer 2)</p>
        <div className="footer-links">
          <a href="https://docs.rootstock.io" target="_blank" rel="noopener noreferrer">
            Rootstock Docs
          </a>
          <span>•</span>
          <a href="https://docs.privy.io" target="_blank" rel="noopener noreferrer">
            Privy Docs
          </a>
        </div>
      </footer>
    </div>
  );
}