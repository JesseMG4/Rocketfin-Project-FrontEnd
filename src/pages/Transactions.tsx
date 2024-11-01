import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import axios from 'axios';
import { FaSearch, FaDollarSign, FaExchangeAlt, FaCalendarAlt, FaChartLine, FaShoppingCart, FaMoneyBillAlt, FaSortUp, FaSortDown } from 'react-icons/fa';

const Transactions: React.FC = () => {
  const [ticker, setTicker] = useState('');
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'buy' | 'sell' | null>(null);
  const [shares, setShares] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell'>('all');
  const [orderBy, setOrderBy] = useState('date');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const { state, addTransactionToState } = useGlobalState();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const handleSearch = async () => {
    if (!ticker) {
      showNotification("Please enter a ticker symbol.", 'warning');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/stockData?symbol=${ticker.toUpperCase()}`);

      if (response.data.length === 0) {
        showNotification(`No data found for symbol "${ticker.toUpperCase()}".`, 'error');
        setSelectedStock(null);
      } else {
        setSelectedStock(response.data[0]);
        showNotification(`Data loaded for ${ticker.toUpperCase()}.`, 'success');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      showNotification("Error fetching stock data. Please check server connection.", 'error');
    }
  };

  const openModal = (type: 'buy' | 'sell') => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  const handleConfirmTransaction = async () => {
    if (!selectedStock || !transactionType) return;

    const ownedShares = state.portfolio.find(stock => stock.symbol === selectedStock.symbol)?.shares || 0;

    if (transactionType === 'sell' && shares > ownedShares) {
      showNotification(`Error: Cannot sell more shares than owned. You own ${ownedShares} shares.`, 'error');
      return;
    }

    const transaction = {
      id: Date.now(),
      symbol: selectedStock.symbol,
      name: selectedStock.displayName || selectedStock.symbol,
      shares,
      type: transactionType,
      price: selectedStock.regularMarketPrice,
      date: new Date().toISOString().split('T')[0],
    };

    // Add transaction to global state
    await addTransactionToState(transaction);
    showNotification(`${transactionType === 'buy' ? 'Bought' : 'Sold'} ${shares} shares of ${selectedStock.symbol}`, 'success');
    setIsModalOpen(false);
  };

  // Filter and sort transactions
  const filteredAndSortedTransactions = state.transactions
    .filter((tx) => {
      const matchesSearch = tx.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const sortFieldA = a[orderBy as keyof typeof a];
      const sortFieldB = b[orderBy as keyof typeof b];

      if (sortFieldA < sortFieldB) return orderDirection === 'asc' ? -1 : 1;
      if (sortFieldA > sortFieldB) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const toggleSortOrder = (field: string) => {
    if (orderBy === field) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(field);
      setOrderDirection('asc');
    }
  };

  return (
    <div className={`container mx-auto mt-8 flex flex-col items-center text-center transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

      {/* Notification */}
      {notification && (
        <div className={`p-2 mb-4 rounded-md ${notification.type === 'success' ? 'bg-green-200 text-green-800' : notification.type === 'error' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
          {notification.message}
        </div>
      )}

      {/* Search and Buy/Sell Section */}
      <div className="flex flex-col sm:flex-row items-center mb-4">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))} // Sanitize input
          placeholder="Enter ticker symbol (e.g., AAPL)"
          className="border p-2 mb-2 sm:mb-0 sm:mr-2 w-full max-w-xs text-center"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 w-full sm:w-auto flex items-center">
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Display Stock Information and Buy/Sell Options */}
      {selectedStock && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold flex items-center justify-center">
            <FaChartLine className="mr-2 text-blue-500" /> {selectedStock.displayName || selectedStock.symbol}
          </h3>
          <p><FaExchangeAlt className="mr-2 text-green-500" /> Bid: ${selectedStock.bid || 'N/A'}</p>
          <p><FaDollarSign className="mr-2 text-yellow-500" /> Current Price: ${selectedStock.regularMarketPrice}</p>

          <div className="flex justify-center items-center mt-4">
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(Math.max(1, Math.floor(Number(e.target.value))))} // Minimum 1 share, integer only
              min="1"
              className="border p-2 mr-2 w-20 text-center"
            />
            <button onClick={() => openModal('buy')} className="bg-green-500 text-white px-4 py-2 mr-2 flex items-center">
              <FaShoppingCart className="mr-2" /> Buy
            </button>
            <button onClick={() => openModal('sell')} className="bg-red-500 text-white px-4 py-2 flex items-center">
              <FaMoneyBillAlt className="mr-2" /> Sell
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Confirm {transactionType} Transaction</h3>
            <p><FaChartLine className="mr-2" /> <strong>Stock:</strong> {selectedStock.displayName || selectedStock.symbol} ({selectedStock.symbol})</p>
            <p><FaDollarSign className="mr-2" /> <strong>Price:</strong> ${selectedStock.regularMarketPrice}</p>
            <p><FaExchangeAlt className="mr-2" /> <strong>Shares:</strong> {shares}</p>
            <div className="flex justify-end mt-6">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button onClick={handleConfirmTransaction} className={`px-4 py-2 rounded ${transactionType === 'buy' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                Confirm {transactionType === 'buy' ? 'Buy' : 'Sell'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction List Filters */}
      <div className="flex flex-col sm:flex-row items-center w-full max-w-md my-4">
        <input
          type="text"
          placeholder="Search by symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-2 sm:mb-0 sm:mr-2 w-full"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'all' | 'buy' | 'sell')}
          className="border p-2 w-full sm:w-auto"
        >
          <option value="all">All</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="mt-4 w-full max-w-4xl overflow-y-auto max-h-80">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {['symbol', 'name', 'type', 'shares', 'price', 'date'].map((col) => (
                <th
                  key={col}
                  className="py-2 px-4 cursor-pointer text-center"
                  onClick={() => toggleSortOrder(col)}
                >
                  <span className="flex items-center justify-center">
                    {orderBy === col && (orderDirection === 'asc' ? <FaSortUp className="text-lg mr-1" /> : <FaSortDown className="text-lg mr-1" />)}
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTransactions.map((tx) => (
              <tr
                key={tx.id}
                className={`text-center border-t hover:bg-blue-50 ${tx.type === 'buy' ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <td className="py-2 px-4">{tx.symbol}</td>
                <td className="py-2 px-4">{tx.name}</td>
                <td className="py-2 px-4 capitalize">{tx.type}</td>
                <td className="py-2 px-4">{tx.shares}</td>
                <td className="py-2 px-4">${tx.price.toFixed(2)}</td>
                <td className="py-2 px-4">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
