// npm install @ankr.com/ankr.js
// import { AnkrProvider } from '@ankr.com/ankr.js';
import { AnkrProvider } from '@ankr.com/ankr.js';

// Setup provider AnkrProvider
const provider = new AnkrProvider('https://rpc.ankr.com/multichain/fc90e2d650d1b105e5de434b6c0bb7cf180f138a0a6df3dc1c46feb92c8494a4');

// Get token balances of address with USD prices among multiple chains
const balances = async () => {
    return await provider.getAccountBalance({
        blockchain: ['bsc', 'eth', 'polygon', 'avalanche'],
        walletAddress: '0xfa9019df60d3c710d7d583b2d69e18d412257617',
    });
};
