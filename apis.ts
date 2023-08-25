import { AnkrProvider } from '@ankr.com/ankr.js';
import type { Blockchain } from '@ankr.com/ankr.js/dist/types';

console.log(process.env.NEXT_PUBLIC_ANKR)
 
const provider = new AnkrProvider(process.env.NEXT_PUBLIC_ANKR);
 
//defining the list of supported blockchains
const listOfChains: Blockchain[] = ['eth', 'arbitrum', 'avalanche', 
'bsc', 'fantom', 'polygon', ];
 
//key-value pair mapping of chains to their native symbols
export const chainsToNativeSymbols: { [key in Blockchain]: string } = {
  eth: 'ETH',
  eth_goerli: 'ETH',
  optimism: 'ETH',
  bsc: 'BNB',
  syscoin: 'SYS',
  polygon: 'MATIC',
  fantom: 'FTM',
  arbitrum: 'ETH',
  avalanche_fuji: 'AVAX',
  avalanche: 'AVAX'
};
 
//getAccountBalance function to fetch coins and their respective token balances
export const getAccountBalance = async (walletAddress: string) => {
  return provider.getAccountBalance({
    walletAddress,
  });
};
 