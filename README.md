# 🪙 CryptoVerse — Cryptocurrency Dashboard

A modern, dark-themed cryptocurrency dashboard built with React. Track live crypto prices, read trending news, compare coins, and explore detailed statistics — all in one place.

---

## 🚀 Features

- 📊 **Live Crypto Stats** — Total market cap, volume, exchanges, and more
- 💰 **Top Coins** — Browse and search hundreds of cryptocurrencies with real-time prices
- 📈 **Price Charts** — Interactive historical price charts with multiple time periods (1d, 7d, 30d, 1y, etc.)
- 📰 **Trending News** — Latest cryptocurrency news from top sources
- ⚖️ **Compare Coins** — Side-by-side comparison of two cryptocurrencies
- 🔍 **Coin Detail Page** — Deep stats, links, description, and price history for any coin

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Redux Toolkit (RTK Query) | State management & API fetching |
| Ant Design | UI Component Library |
| React Router v6 | Client-side routing |
| Chart.js + react-chartjs-2 | Price charts |
| Moment.js | Date formatting |
| CoinRanking API | Crypto price & stats data |

---

## 📦 Getting Started

### Prerequisites
- Node.js v16 or above
- npm v8 or above

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>

# 2. Go into the project folder
cd cryptocurrency-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will open at **http://localhost:3000**

---

## 📁 Project Structure

```
src/
├── Component/
│   ├── Home.js        → Dashboard home with stats & news preview
│   ├── Crypto.js      → Full crypto list with search
│   ├── Detail.js      → Single coin detail page with chart
│   ├── News.js        → Cryptocurrency news feed
│   ├── Compare.js     → Side-by-side coin comparison
│   ├── Chart.js       → Reusable price chart component
│   └── NavBar.jsx     → Sidebar navigation
├── Services/
│   ├── cryptoApi.js   → CoinRanking API (RTK Query)
│   ├── cryptoNew.js   → News data service
│   └── store.js       → Redux store configuration
├── App.js             → Main app with routing
├── App.css            → Global dark-theme styles
└── index.js           → React entry point
```

---

## 🖥️ Available Scripts

| Command | Description |
|---|---|
| `npm start` | Run the app in development mode |
| `npm run build` | Build the app for production |
| `npm test` | Run tests |

---

## 🌐 Live Demo

> https://648092a8b7cfbf0904877858--heroic-tartufo-10ae66.netlify.app/

---

## 📝 Notes

- The **Bing News Search API** (via RapidAPI) was retired by Microsoft in August 2025. The news section now uses curated mock data to display cryptocurrency news articles.
- API keys for CoinRanking are included for development purposes only. Move them to environment variables (`.env`) before deploying to production.

---

## 📄 License

This project is open source and available for educational use.
