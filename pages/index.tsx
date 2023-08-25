import { useEffect, useState } from 'react';
import { getAccountBalance } from '../apis';

function App() {
  const [assets, setAssets] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('All');

  console.log("Environment Variables: ", process.env);
  console.log("Environment Variable: ", process.env.NEXT_PUBLIC_WALLET_ADDRESSES);

  // Reading from the .env file
  const walletAddresses = process.env.NEXT_PUBLIC_WALLET_ADDRESSES.split(',');
  const walletNames = process.env.NEXT_PUBLIC_WALLET_NAMES.split(',');

  const wallets = walletAddresses.map((address, index) => ({
    address,
    name: walletNames[index].replace(/_/g, ' '),
  }));

  useEffect(() => {
    (async () => {
      let mergedAssets = [];
      for (let wallet of wallets) {
        const total = await getAccountBalance(wallet.address);
        // Add a new property 'walletName' to each asset for identification
        const assetsWithWalletName = total.assets.map(asset => ({
          ...asset,
          walletName: wallet.name,
          walletAddress: wallet.address
        }));
        mergedAssets = [...mergedAssets, ...assetsWithWalletName];
      }
      // Sorting by balance USD and setting the state
      const sortedAssets = mergedAssets.sort((a, b) => parseFloat(b.balanceUsd) - parseFloat(a.balanceUsd));
      setAssets(sortedAssets);
    })();
  }, []);

  const filteredAssets = selectedSymbol === 'All' ? assets : assets.filter(asset => asset.tokenSymbol === selectedSymbol);
  
  const sumBalance = filteredAssets.reduce((acc, asset) => acc + parseFloat(asset.balance), 0);
  const sumBalanceUsd = filteredAssets.reduce((acc, asset) => acc + parseFloat(asset.balanceUsd), 0);

  return (
    <div className='p-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>Account Balance</h1>
      <div className="mt-5">
        <select onChange={e => setSelectedSymbol(e.target.value)}>
          <option value="All">All</option>
          {Array.from(new Set(assets.map(asset => asset.tokenSymbol))).map(symbol => (
            <option key={symbol} value={symbol}>{symbol}</option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        <p>Sum Balance: {sumBalance.toFixed(4)}</p>
        <p>Sum USD Balance: {sumBalanceUsd.toFixed(4)}</p>
      </div>
      <table className='mt-5'>
        <thead>
          <tr>
            <th>Wallet Name</th>
            <th>Blockchain</th>
            <th>Token Name</th>
            <th>Token Symbol</th>
            <th>Balance</th>
            <th>USD Balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset, index) => (
            <tr key={index}>
              <td>{asset.walletName}</td>
              <td>{asset.blockchain}</td>
              <td>{asset.tokenName}</td>
              <td>{asset.tokenSymbol}</td>
              <td>{parseFloat(asset.balance).toFixed(4)}</td>
              <td>{parseFloat(asset.balanceUsd).toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;