import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { getPortfolio, getTransactions, addTransaction } from '../api/api';

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

const initialState: GlobalState = {
  portfolio: [],
  transactions: [],
};

type Action =
  | { type: 'SET_PORTFOLIO'; payload: Stock[] }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction };

function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'SET_PORTFOLIO':
      return { ...state, portfolio: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    default:
      return state;
  }
}

const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
  addTransactionToState: (transaction: Transaction) => Promise<void>;
} | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioResponse = await getPortfolio();
        const transactionsResponse = await getTransactions();
        dispatch({ type: 'SET_PORTFOLIO', payload: portfolioResponse.data });
        dispatch({ type: 'SET_TRANSACTIONS', payload: transactionsResponse.data });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const addTransactionToState = async (transaction: Transaction) => {
    try {
      const response = await addTransaction(transaction);
      dispatch({ type: 'ADD_TRANSACTION', payload: response.data });
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, addTransactionToState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
