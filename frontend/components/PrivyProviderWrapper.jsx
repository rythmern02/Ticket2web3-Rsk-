'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { ROOTSTOCK_TESTNET, PRIVY_APP_ID } from '../config/privy';

export default function PrivyProviderWrapper({ children }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#FF6B00',
        },
        loginMethods: ['email', 'google'],
        embeddedWallets: {
          createOnLogin: 'all-users', // Changed from 'users-without-wallets'
          requireUserPasswordOnCreate: false,
        },
        // Disable external wallets to force embedded wallet
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: 'eoaOnly', // Disable smart wallet
          },
        },
        defaultChain: ROOTSTOCK_TESTNET,
        supportedChains: [ROOTSTOCK_TESTNET],
      }}
    >
      {children}
    </PrivyProvider>
  );
}