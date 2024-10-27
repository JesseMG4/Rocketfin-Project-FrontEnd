# Rocketfin Project

## Investment Portfolio Management Tool

### Overview
Rocketfin is an investment portfolio management tool built with React. This application allows users to view and manage their stock portfolios, handle transactions (buy/sell stocks), and gain insights into unrealized profits and losses. Initially utilizing mock data, the project is enhanced with `json-server` for backend API simulation, making it suitable for real-world application scenarios.

### Features
- **Portfolio Overview**: Display all stocks in the portfolio with details on cost basis, market value, and unrealized profit/loss.
- **Recent Transactions**: View the five most recent transactions directly on the Home page.
- **Transaction Management**: Users can buy or sell stocks, view transaction history for individual stocks, and filter transactions.
- **State Management**: Uses React Context API for managing the global state of the portfolio and transactions.
- **Notifications**: Provides user feedback with notifications for actions like buying/selling stocks, with appropriate color coding for success and errors.

### Tech Stack
- **Frontend**: React with TypeScript, styled with Tailwind CSS
- **Backend Simulation**: JSON mock data with optional `json-server` for backend simulation
- **State Management**: React Context API

### Installation and Setup

#### Prerequisites
- Node.js and npm installed on your machine
- Recommended: Install `json-server` globally for backend simulation

#### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <your-repo-link>
   cd <project-directory>

    Install Dependencies

    bash

npm install

Optional: Set up json-server for API Simulation To simulate the backend, you can use json-server. This will provide endpoints for portfolio data and transactions.

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
    {
      "symbol": "MSFT",
      "name": "Microsoft Corporation",
      "shares": 3,
      "costBasis": 210.50,
      "marketValue": 640.00,
      "unrealizedProfitLoss": 10.00,
      "unrealizedReturnRate": 1.58
    },
    {
      "symbol": "GOOGL",
      "name": "Alphabet Inc.",
      "shares": 2,
      "costBasis": 1450.00,
      "marketValue": 2900.00,
      "unrealizedProfitLoss": -10.00,
      "unrealizedReturnRate": -0.34
    },
    {
      "symbol": "AMZN",
      "name": "Amazon.com Inc.",
      "shares": 1,
      "costBasis": 3175.00,
      "marketValue": 3176.89,
      "unrealizedProfitLoss": 1.89,
      "unrealizedReturnRate": 0.06
    },
    {
      "symbol": "TSLA",
      "name": "Tesla Inc.",
      "shares": 3,
      "costBasis": 650.00,
      "marketValue": 1950.00,
      "unrealizedProfitLoss": 50.00,
      "unrealizedReturnRate": 2.63
    },
    {
      "symbol": "NFLX",
      "name": "Netflix Inc.",
      "shares": 5,
      "costBasis": 480.00,
      "marketValue": 2500.00,
      "unrealizedProfitLoss": 200.00,
      "unrealizedReturnRate": 8.69
    },
    {
      "symbol": "NVDA",
      "name": "NVIDIA Corporation",
      "shares": 4,
      "costBasis": 500.00,
      "marketValue": 2400.00,
      "unrealizedProfitLoss": 150.00,
      "unrealizedReturnRate": 6.25
    }
  ],
  "transactions": [
    { "id": 1, "symbol": "AAPL", "name": "Apple Inc.", "shares": 10, "type": "buy", "price": 117.32, "date": "2023-10-01" },
    { "id": 2, "symbol": "MSFT", "name": "Microsoft Corporation", "shares": 5, "type": "buy", "price": 211.29, "date": "2023-10-05" },
    { "id": 3, "symbol": "AAPL", "name": "Apple Inc.", "shares": 5, "type": "sell", "price": 120.00, "date": "2023-10-10" },
    { "id": 4, "symbol": "GOOGL", "name": "Alphabet Inc.", "shares": 2, "type": "buy", "price": 1450.72, "date": "2023-10-12" },
    { "id": 5, "symbol": "AAPL", "name": "Apple Inc.", "shares": 3, "type": "buy", "price": 119.50, "date": "2023-10-15" },
    { "id": 6, "symbol": "MSFT", "name": "Microsoft Corporation", "shares": 2, "type": "sell", "price": 210.00, "date": "2023-10-18" },
    { "id": 7, "symbol": "AMZN", "name": "Amazon.com Inc.", "shares": 1, "type": "buy", "price": 3176.89, "date": "2023-10-20" },
    { "id": 8, "symbol": "TSLA", "name": "Tesla Inc.", "shares": 4, "type": "buy", "price": 420.80, "date": "2023-10-22" },
    { "id": 9, "symbol": "NFLX", "name": "Netflix Inc.", "shares": 6, "type": "buy", "price": 490.75, "date": "2023-10-25" },
    { "id": 10, "symbol": "TSLA", "name": "Tesla Inc.", "shares": 2, "type": "sell", "price": 425.00, "date": "2023-10-26" },
    { "id": 11, "symbol": "NVDA", "name": "NVIDIA Corporation", "shares": 4, "type": "buy", "price": 500.00, "date": "2023-10-27" },
    { "id": 12, "symbol": "NFLX", "name": "Netflix Inc.", "shares": 2, "type": "sell", "price": 495.00, "date": "2023-10-28" }
  ],
  "stockData": [
    {
      "symbol": "AAPL",
      "displayName": "Apple Inc.",
      "bid": 140.00,
      "regularMarketPrice": 145.00
    },
    {
      "symbol": "MSFT",
      "displayName": "Microsoft Corporation",
      "bid": 300.00,
      "regularMarketPrice": 305.00
    },
    {
      "symbol": "GOOGL",
      "displayName": "Alphabet Inc.",
      "bid": 2700.00,
      "regularMarketPrice": 2750.00
    }
  ]
}

Run json-server on port 5000:

bash

json-server --watch db.json --port 5000

Run the Frontend Application:

bash

    npm run dev

    The application will run at http://localhost:3000.

Usage

    Home Page: Displays the portfolio overview and recent transactions.
    Portfolio Page: Lists all stocks in the portfolio. Clicking on a stock will show its transaction history.
    Transactions Page: Allows users to search for a stock, view its details, and perform buy/sell transactions.

Project Structure

    src/components: Contains reusable components, including navigation and footer.
    src/pages: Contains individual page components like Home, Portfolio, and Transactions.
    src/context: Contains the global state and context management for portfolio and transaction data.

Future Enhancements

    Backend Integration: Replace mock data with a real API for persistent data management.
    User Authentication: Add user authentication to enable secure access to personal portfolios.
    Improved UI: Enhance the UI/UX with more animations and data visualizations.
