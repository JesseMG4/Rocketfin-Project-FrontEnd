// src/pages/StockTransactions.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';
import { FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

const StockTransactions: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>(); // Get the stock symbol from the URL
  const { state } = useGlobalState(); // Access global state
  const transactions = state.transactions.filter(tx => tx.symbol === symbol); // Filter transactions by symbol

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-semibold text-center">Transaction History for {symbol}</h2>
      
      {transactions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white border rounded-lg p-4 shadow-md">
              <p className="text-lg font-semibold">{tx.name} ({tx.symbol})</p>
              <p><FaDollarSign className="mr-2" /> <strong>Shares:</strong> {tx.shares}</p>
              <p><FaCalendarAlt className="mr-2" /> <strong>Date:</strong> {tx.date}</p>
              <p><strong>Type:</strong> {tx.type}</p>
              <p><strong>Price:</strong> ${tx.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No transactions found for {symbol}.</p>
      )}
    </div>
  );
};

export default StockTransactions;
