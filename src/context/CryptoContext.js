import { createContext, useEffect, useLayoutEffect, useState } from 'react';

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [coinSearch, setCoinSearch] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [coinInfos, setcoinInfos] = useState('');

  const getCoininfo = async (coinId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );

      const data = await response.json();

      setcoinInfos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCryptoInfo = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h,24h,7d`
      );

      const data = await response.json();

      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCryptoSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );

      const data = await response.json();
      console.log(data.coins);

      setSearchData(data.coins || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCryptoInfo();
  }, [coinSearch, currency]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getCryptoSearch,
        setCoinSearch,
        setSearchData,
        setCurrency,
        currency,
        coinInfos,
        setcoinInfos,
        getCoininfo,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
