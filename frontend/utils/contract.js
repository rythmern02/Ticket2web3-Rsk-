import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/privy';

export const mintNFT = async (wallet) => {
  if (!wallet) {
    throw new Error("No wallet found");
  }

  const provider = await wallet.getEthersProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
  const userAddress = await signer.getAddress();
  const tx = await contract.mintTicket(userAddress);
  const receipt = await tx.wait();
  
  return {
    transactionHash: receipt.transactionHash,
    tokenId: receipt.events?.[0]?.args?.tokenId?.toString() || "1"
  };
};

export const getExplorerUrl = (address) => {
  return `https://explorer.testnet.rsk.co/address/${address}`;
};