import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalStateProvider } from './context/GlobalStateContext';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Transactions from './pages/Transactions';
import StockTransactions from './pages/StockTransactions';

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/:symbol" element={<StockTransactions />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;
