export const ROOTSTOCK_TESTNET = {
    id: 31,
    name: 'Rootstock Testnet',
    network: 'rootstock-testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Test Rootstock Bitcoin',
      symbol: 'tRBTC',
    },
    rpcUrls: {
      public: { http: ['https://public-node.testnet.rsk.co'] },
      default: { http: ['https://public-node.testnet.rsk.co'] },
    },
    blockExplorers: {
      default: { 
        name: 'RSK Testnet Explorer', 
        url: 'https://explorer.testnet.rsk.co' 
      },
    },
    testnet: true,
  };
  
  export const CONTRACT_ADDRESS = '0x87fDCaF7555d8aFD918AB3E870662cec14459492';
  export const PRIVY_APP_ID = 'cmjx8eim201q8l10cmjad3w3r';
  
  export const CONTRACT_ABI = [
    "function mintTicket(address attendee) public returns (uint256)",
    "function balanceOf(address owner) public view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)"
  ];