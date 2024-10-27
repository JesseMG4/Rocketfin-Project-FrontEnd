# Rocketfin-project
 
Investment Portfolio Management Tool
Overview

This project is a simple portfolio management tool built using React. It allows users to view their stock portfolio, manage transactions (buy/sell stocks), and get an overview of unrealized profit and loss. This project simulates backend data using mock data, and it can be further enhanced with json-server for backend API simulation.
Features

    Portfolio Overview: View all stocks in the portfolio with details on cost basis, market value, and unrealized profit/loss.
    Recent Transactions: Displays the five most recent transactions on the Home page.
    Transaction Management: Users can buy or sell stocks, view transaction history for individual stocks, and filter transactions.
    State Management: Uses React Context API for managing the global state of the portfolio and transactions.

Tech Stack

    Frontend: React with TypeScript, Tailwind CSS for styling
    Backend Simulation: JSON mock data (optional json-server for backend simulation)
    State Management: React Context API

Installation and Setup
Prerequisites

    Node.js and npm
    Recommended: Install json-server globally

Setup Instructions

    Clone the Repository

    bash

git clone <your-repo-link>
cd <project-directory>

Install Dependencies

bash

npm install

Optional: Setup json-server for API Simulation

To simulate the backend, you can use json-server. This will provide endpoints for portfolio data and transactions.

bash

npm install -g json-server

Create a file called db.json in the root directory with the following structure:

json

{
  "portfolio": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "shares": 8,
      "costBasis": 118.00,
      "marketValue": 940.00,
      "unrealizedProfitLoss": 20.00,
      "unrealizedReturnRate": 2.17
    },
    // other stocks
  ],
  "transactions": [
    {
      "id": 1,
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "shares": 10,
      "type": "buy",
      "price": 117.32,
      "date": "2023-10-01"
    },
    // other transactions
  ]
}

Run json-server on port 5000:

bash

json-server --watch db.json --port 5000

Run the Frontend Application

bash

    npm run dev

    The application will run at http://localhost:3000.

Usage

    Home Page: Displays the portfolio overview and recent transactions.
    Portfolio Page: Lists all stocks in the portfolio. Clicking on a stock will show its transaction history.
    Transactions Page: Allows users to search for a stock, view its details, and perform buy/sell transactions.

Project Structure

    src/components: Contains reusable components, including the navigation and footer.
    src/pages: Contains individual page components like Home, Portfolio, and Transactions.
    src/context: Contains the global state and context management for portfolio and transaction data.

Future Enhancements

    Backend Integration: Replace mock data with a real API for persistent data management.
    User Authentication: Add user authentication to enable secure access to personal portfolios.
    Improved UI: Enhance the UI/UX with more animations and data visualizations.
