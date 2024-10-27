// src/data/dummyData.ts

export const stockData = {
  quoteResponse: {
    error: null,
    result: [
      {
        symbol: "AAPL",
        displayName: "Apple Inc.",
        bid: 117.25,
        ask: 117.27,
        regularMarketPrice: 117.32,
        regularMarketChange: 4.5,
        regularMarketChangePercent: 3.99,
      },
      {
        symbol: "MSFT",
        displayName: "Microsoft Corporation",
        bid: 211.25,
        ask: 211.63,
        regularMarketPrice: 211.29,
        regularMarketChange: 8.63,
        regularMarketChangePercent: 4.26,
      },
      {
        symbol: "GOOGL",
        displayName: "Alphabet Inc.",
        bid: 1450.15,
        ask: 1451.18,
        regularMarketPrice: 1450.72,
        regularMarketChange: -10.15,
        regularMarketChangePercent: -0.70,
      },
      {
        symbol: "AMZN",
        displayName: "Amazon.com Inc.",
        bid: 3175.00,
        ask: 3177.50,
        regularMarketPrice: 3176.89,
        regularMarketChange: 15.50,
        regularMarketChangePercent: 0.49,
      },
      {
        symbol: "TSLA",
        displayName: "Tesla Inc.",
        bid: 420.50,
        ask: 421.10,
        regularMarketPrice: 420.80,
        regularMarketChange: 5.25,
        regularMarketChangePercent: 1.26,
      },
      {
        symbol: "NFLX",
        displayName: "Netflix Inc.",
        bid: 490.00,
        ask: 491.20,
        regularMarketPrice: 490.75,
        regularMarketChange: -3.50,
        regularMarketChangePercent: -0.71,
      },
    ],
  },
};

export const transactionData = [
  { id: 1, symbol: "AAPL", name: "Apple Inc.", shares: 10, type: "buy", price: 117.32, date: "2023-10-01" },
  { id: 2, symbol: "MSFT", name: "Microsoft Corporation", shares: 5, type: "buy", price: 211.29, date: "2023-10-05" },
  { id: 3, symbol: "AAPL", name: "Apple Inc.", shares: 5, type: "sell", price: 120.00, date: "2023-10-10" },
  { id: 4, symbol: "GOOGL", name: "Alphabet Inc.", shares: 2, type: "buy", price: 1450.72, date: "2023-10-12" },
  { id: 5, symbol: "AAPL", name: "Apple Inc.", shares: 3, type: "buy", price: 119.50, date: "2023-10-15" },
  { id: 6, symbol: "MSFT", name: "Microsoft Corporation", shares: 2, type: "sell", price: 210.00, date: "2023-10-18" },
  { id: 7, symbol: "AMZN", name: "Amazon.com Inc.", shares: 1, type: "buy", price: 3176.89, date: "2023-10-20" },
  { id: 8, symbol: "TSLA", name: "Tesla Inc.", shares: 4, type: "buy", price: 420.80, date: "2023-10-22" },
  { id: 9, symbol: "NFLX", name: "Netflix Inc.", shares: 6, type: "sell", price: 490.75, date: "2023-10-25" },
  { id: 10, symbol: "TSLA", name: "Tesla Inc.", shares: 2, type: "sell", price: 425.00, date: "2023-10-26" },
];



export const portfolioData = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 8, costBasis: 118.00, marketValue: 940.00, unrealizedProfitLoss: 20.00, unrealizedReturnRate: 2.17 },
  { symbol: "MSFT", name: "Microsoft Corporation", shares: 3, costBasis: 210.50, marketValue: 640.00, unrealizedProfitLoss: 10.00, unrealizedReturnRate: 1.58 },
  { symbol: "GOOGL", name: "Alphabet Inc.", shares: 2, costBasis: 1450.00, marketValue: 2900.00, unrealizedProfitLoss: -10.00, unrealizedReturnRate: -0.34 },
  { symbol: "AMZN", name: "Amazon.com Inc.", shares: 1, costBasis: 3175.00, marketValue: 3176.89, unrealizedProfitLoss: 1.89, unrealizedReturnRate: 0.06 },
  { symbol: "TSLA", name: "Tesla Inc.", shares: 2, costBasis: 421.00, marketValue: 841.60, unrealizedProfitLoss: -0.40, unrealizedReturnRate: -0.05 },
  { symbol: "NFLX", name: "Netflix Inc.", shares: 6, costBasis: 490.00, marketValue: 2944.50, unrealizedProfitLoss: -3.00, unrealizedReturnRate: -0.10 },
];
