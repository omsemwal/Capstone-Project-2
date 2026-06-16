import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mockNews = [
  {
    name: "Bitcoin Surpasses $69,000 as ETF Inflows Hit Record Highs",
    url: "https://www.coindesk.com",
    title: "CoinDesk",
    datePublished: "2026-06-15T09:12:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "CoinDesk", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Ethereum Layer-2 Networks See Gas Fees Plunge Post-Dencun Upgrade",
    url: "https://cointelegraph.com",
    title: "CoinTelegraph",
    datePublished: "2026-06-15T08:45:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "CoinTelegraph", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Solana Network Activity Reaches All-Time High Driven by DeFi Volume",
    url: "https://blockworks.co",
    title: "Blockworks",
    datePublished: "2026-06-15T08:15:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "Blockworks", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "US SEC Approves First Spot Ethereum ETFs in Landmark Decision",
    url: "https://www.coindesk.com",
    title: "CoinDesk",
    datePublished: "2026-06-15T07:30:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "CoinDesk", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Cardano Founder Announces Major Governance Upgrade 'Chang Hard Fork'",
    url: "https://cointelegraph.com",
    title: "CoinTelegraph",
    datePublished: "2026-06-15T07:00:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "CoinTelegraph", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Ripple Labs Partners with Major European Banks for Cross-Border Settlement",
    url: "https://blockworks.co",
    title: "Blockworks",
    datePublished: "2026-06-15T06:30:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "Blockworks", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Crypto Market Cap Reclaims $2.5 Trillion as Altcoins Rally",
    url: "https://www.coindesk.com",
    title: "CoinDesk",
    datePublished: "2026-06-15T06:00:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "CoinDesk", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Staking Yields Rise: Why Investors are Locking Up More ETH and SOL",
    url: "https://cointelegraph.com",
    title: "CoinTelegraph",
    datePublished: "2026-06-15T05:30:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "CoinTelegraph", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Web3 Gaming Sectors See $1 Billion Venture Capital Inflow in Q1",
    url: "https://blockworks.co",
    title: "Blockworks",
    datePublished: "2026-06-15T05:00:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1634704784915-aacf363b021f?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "Blockworks", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Inflation Data Sparks Bullish Crypto Sentiment Across Global Markets",
    url: "https://www.coindesk.com",
    title: "CoinDesk",
    datePublished: "2026-06-15T04:30:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "CoinDesk", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Decentralized Finance (DeFi) TVL Surges Back to Pre-Bear Market Levels",
    url: "https://cointelegraph.com",
    title: "CoinTelegraph",
    datePublished: "2026-06-15T04:00:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "CoinTelegraph", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=80&auto=format&fit=crop" } } }]
  },
  {
    name: "Major Tech Giants Integrate Web3 Digital Wallets into Mobile Devices",
    url: "https://blockworks.co",
    title: "Blockworks",
    datePublished: "2026-06-15T03:30:00.000Z",
    image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=400&auto=format&fit=crop" } },
    provider: [{ name: "Blockworks", image: { thumbnail: { contentUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=80&auto=format&fit=crop" } } }]
  }
];

export const cryptoNew = createApi({
  reducerPath: "cryptoNew",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getNews: builder.query({
      // queryFn bypasses the network entirely — returning mock data immediately.
      // Reason: The Bing News Search API (bing-news-search1.p.rapidapi.com) was
      // permanently retired by Microsoft in August 2025 and returns 404 errors.
      queryFn: ({ cat, count }) => {
        return { data: { value: mockNews.slice(0, count) } };
      },
    }),
  }),
});

export const { useGetNewsQuery } = cryptoNew;

