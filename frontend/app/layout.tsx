import { Inter } from 'next/font/google';
import './globals.css';
import PrivyProviderWrapper from '../components/PrivyProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TicketToWeb3 - NFT Event Tickets on Rootstock',
  description: 'Claim your proof-of-attendance NFT on Bitcoin Layer 2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProviderWrapper>
          {children}
        </PrivyProviderWrapper>
      </body>
    </html>
  );
}