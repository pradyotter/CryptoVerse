import { createContext, useEffect, useLayoutEffect, useState } from 'react';

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendData, settrendData] = useState([]);

  const getTrendingCoins = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search/trending`
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getTrendingCoins();
  }, []);

  return (
    <TrendingContext.Provider value={{}}>{children}</TrendingContext.Provider>
  );
};
