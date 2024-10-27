// src/context/GlobalStateContext.tsx

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the structure of Stock and Transaction
interface Stock {
  symbol: string;
  name: string;
  shares: number;
  costBasis: number;
  marketValue: number;
  unrealizedProfitLoss: number;
  unrealizedReturnRate: number;
}

interface Transaction {
  id: number;
  symbol: string;
  name: string;
  shares: number;
  type: 'buy' | 'sell';
  price: number;
  date: string;
}

interface GlobalState {
  portfolio: Stock[];
  transactions: Transaction[];
}

// Initial state with sample portfolio and transactions
const initialState: GlobalState = {
  portfolio: [
    { symbol: "AAPL", name: "Apple Inc.", shares: 8, costBasis: 118.00, marketValue: 940.00, unrealizedProfitLoss: 20.00, unrealizedReturnRate: 2.17 },
    { symbol: "MSFT", name: "Microsoft Corporation", shares: 3, costBasis: 210.50, marketValue: 640.00, unrealizedProfitLoss: 10.00, unrealizedReturnRate: 1.58 },
    { symbol: "GOOGL", name: "Alphabet Inc.", shares: 2, costBasis: 1450.00, marketValue: 2900.00, unrealizedProfitLoss: -10.00, unrealizedReturnRate: -0.34 },
    { symbol: "AMZN", name: "Amazon.com Inc.", shares: 1, costBasis: 3175.00, marketValue: 3176.89, unrealizedProfitLoss: 1.89, unrealizedReturnRate: 0.06 },
  ],
  transactions: [
    { id: 1, symbol: "AAPL", name: "Apple Inc.", shares: 10, type: "buy", price: 117.32, date: "2023-10-01" },
    { id: 2, symbol: "MSFT", name: "Microsoft Corporation", shares: 5, type: "buy", price: 211.29, date: "2023-10-05" },
    { id: 3, symbol: "AAPL", name: "Apple Inc.", shares: 5, type: "sell", price: 120.00, date: "2023-10-10" },
    { id: 4, symbol: "GOOGL", name: "Alphabet Inc.", shares: 2, type: "buy", price: 1450.72, date: "2023-10-12" },
    { id: 5, symbol: "AAPL", name: "Apple Inc.", shares: 3, type: "buy", price: 119.50, date: "2023-10-15" },
    { id: 6, symbol: "MSFT", name: "Microsoft Corporation", shares: 2, type: "sell", price: 210.00, date: "2023-10-18" },
    { id: 7, symbol: "AMZN", name: "Amazon.com Inc.", shares: 1, type: "buy", price: 3176.89, date: "2023-10-20" },
    { id: 8, symbol: "TSLA", name: "Tesla Inc.", shares: 4, type: "buy", price: 420.80, date: "2023-10-22" },
    { id: 9, symbol: "NFLX", name: "Netflix Inc.", shares: 6, type: "buy", price: 490.75, date: "2023-10-25" },
    { id: 10, symbol: "TSLA", name: "Tesla Inc.", shares: 2, type: "sell", price: 425.00, date: "2023-10-26" },
  ],
};

// Define actions for the reducer
type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_PORTFOLIO'; payload: Stock[] };

// Reducer function to handle actions
function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const transaction = action.payload;

      if (transaction.type === 'buy') {
        // Process "buy" transactions: update shares and cost basis if stock exists, or add new stock
        const updatedPortfolio = state.portfolio.map((stock) =>
          stock.symbol === transaction.symbol
            ? {
                ...stock,
                shares: stock.shares + transaction.shares,
                costBasis:
                  (stock.costBasis * stock.shares + transaction.price * transaction.shares) /
                  (stock.shares + transaction.shares),
              }
            : stock
        );

        const isExistingStock = state.portfolio.some((stock) => stock.symbol === transaction.symbol);
        const finalPortfolio = isExistingStock
          ? updatedPortfolio
          : [
              ...updatedPortfolio,
              {
                symbol: transaction.symbol,
                name: transaction.name,
                shares: transaction.shares,
                costBasis: transaction.price,
                marketValue: transaction.price * transaction.shares,
                unrealizedProfitLoss: 0,
                unrealizedReturnRate: 0,
              },
            ];

        return {
          ...state,
          portfolio: finalPortfolio,
          transactions: [...state.transactions, transaction],
        };
      }

      if (transaction.type === 'sell') {
        // Process "sell" transactions: deduct shares and remove stock if shares reach zero
        const updatedPortfolio = state.portfolio
          .map((stock) =>
            stock.symbol === transaction.symbol
              ? {
                  ...stock,
                  shares: stock.shares - transaction.shares,
                }
              : stock
          )
          .filter((stock) => stock.shares > 0);

        return {
          ...state,
          portfolio: updatedPortfolio,
          transactions: [...state.transactions, transaction],
        };
      }

      return state;
    }

    case 'UPDATE_PORTFOLIO':
      return {
        ...state,
        portfolio: action.payload,
      };

    default:
      return state;
  }
}

// Create context and provider
const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook for using global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
