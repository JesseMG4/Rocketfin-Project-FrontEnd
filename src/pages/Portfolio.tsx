import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';
import { FaDollarSign, FaChartLine, FaCoins, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Portfolio: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const { state } = useGlobalState();

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in effect on component load
  }, []);

  const handleStockClick = (symbol: string) => {
    navigate(`/transactions/${symbol}`); // Navigate to transaction history of the stock
  };

  return (
    <div className={`container mx-auto mt-4 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-semibold text-center">Portfolio Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {state.portfolio.length > 0 ? (
          state.portfolio.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => handleStockClick(stock.symbol)}
              className="bg-white border rounded-lg p-4 shadow-md cursor-pointer transform transition duration-300 hover:bg-blue-100 hover:scale-105"
            >
              <h4 className="font-semibold text-lg mb-2 flex items-center">
                {stock.name} ({stock.symbol})
              </h4>
              <p className="flex items-center">
                <FaCoins className="mr-2" />
                <strong>Shares:</strong> {stock.shares}
              </p>
              <p className="flex items-center">
                <FaDollarSign className="mr-2" />
                <strong>Cost Basis:</strong> ${stock.costBasis.toFixed(2)}
              </p>
              <p className="flex items-center">
                <FaChartLine className="mr-2" />
                <strong>Market Value:</strong> ${stock.marketValue.toFixed(2)}
              </p>
              <p className="flex items-center">
                {stock.unrealizedProfitLoss >= 0 ? (
                  <FaArrowUp className="text-green-500 mr-2" />
                ) : (
                  <FaArrowDown className="text-red-500 mr-2" />
                )}
                <strong
                  className={`${
                    stock.unrealizedProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  Unrealized P/L:
                </strong>{' '}
                <span
                  className={`${
                    stock.unrealizedProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  ${stock.unrealizedProfitLoss.toFixed(2)} ({stock.unrealizedReturnRate.toFixed(2)}%)
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No stocks available in the portfolio.</p>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
