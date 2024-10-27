import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { FaDollarSign, FaExchangeAlt, FaCalendarAlt, FaBox } from 'react-icons/fa';
import Portfolio from './Portfolio';

const Home: React.FC = () => {
  const { state } = useGlobalState();
  const recentTransactions = state.transactions.slice(-5).reverse(); // Get 5 most recent transactions

  const [fadeIn, setFadeIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in effect on component load
  }, []);

  const openModal = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className={`container mx-auto mt-4 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-semibold text-center mb-4">Home</h2>
      
      {/* Grid Layout for Left Column (Recent Transactions) and Right Column (Portfolio) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Left Column: Recent Transactions */}
        <div className="md:col-span-1">
          <h3 className="text-xl mb-2">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => openModal(tx)}
                className={`border rounded-lg p-4 shadow-md cursor-pointer transform transition duration-300 hover:scale-105
                  ${tx.type === 'buy' ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'}`}
              >
                <h4 className="font-semibold text-lg mb-2 flex items-center">
                  <FaBox className={`mr-2 ${tx.type === 'buy' ? 'text-green-600' : 'text-red-600'}`} /> 
                  {tx.name} ({tx.symbol})
                </h4>
                <p className="flex items-center">
                  <FaExchangeAlt className="mr-2 text-green-500" />
                  <strong>Shares:</strong> {tx.shares}
                </p>
                <p className="flex items-center">
                  <FaDollarSign className="mr-2 text-yellow-500" />
                  <strong>Type:</strong> {tx.type}
                </p>
                <p className="flex items-center">
                  <FaDollarSign className="mr-2 text-purple-500" />
                  <strong>Price:</strong> ${tx.price.toFixed(2)}
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  <strong>Date:</strong> {tx.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Portfolio */}
        <div className="md:col-span-2">
          <Portfolio />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <FaBox className={`mr-2 ${selectedTransaction.type === 'buy' ? 'text-green-600' : 'text-red-600'}`} /> 
              {selectedTransaction.name} ({selectedTransaction.symbol})
            </h3>
            <p className="text-lg flex items-center">
              <FaExchangeAlt className="mr-2 text-green-500" />
              <strong>Shares:</strong> {selectedTransaction.shares}
            </p>
            <p className="text-lg flex items-center">
              <FaDollarSign className="mr-2 text-yellow-500" />
              <strong>Type:</strong> {selectedTransaction.type}
            </p>
            <p className="text-lg flex items-center">
              <FaDollarSign className="mr-2 text-purple-500" />
              <strong>Price:</strong> ${selectedTransaction.price.toFixed(2)}
            </p>
            <p className="text-lg flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <strong>Date:</strong> {selectedTransaction.date}
            </p>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
