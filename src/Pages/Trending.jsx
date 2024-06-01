import React, { useEffect, useState } from 'react';
import CoinDetails from './CoinDetails';

const Trending = () => {
  const [trendData, settrendData] = useState([]);
  const [selectCoin, setSelectCoin] = useState(null);
  const [openModal, setOpenModal] = useState(true);

  console.log(trendData);
  const getTrendingCoins = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      );
      const data = await response.json();
      settrendData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrendingCoins();
  }, []);

  return (
    <section className=' w-full mt-5 '>
      <div className='w-[50%] mx-auto grid grid-cols-2 gap-5 '>
        {trendData.map((item) => {
          return (
            <div className='' key={item.item.id}>
              <div className='bg-[#001f3f] px-3 py-2 rounded'>
                <div className='flex gap-3 items-center '>
                  <p className='text-[#7c7876] text-[.8rem]'>
                    Name:{' '}
                    <span className=' cursor-pointer text-[#27e7e7]'>
                      {item.item.name}
                    </span>{' '}
                  </p>
                  <img
                    className='w-[1.5rem] rounded h-[1.5rem]'
                    src={item.item.thumb}
                    alt=''
                  />
                </div>
                <div>
                  <p className='text-[#7c7876] text-[.8rem]'>
                    Market Cap Rank:{' '}
                    <span className='text-[#27e7e7]'>
                      {item.item.market_cap_rank}
                    </span>
                  </p>
                </div>
                <div>
                  {' '}
                  <p className='text-[#7c7876] text-[.8rem]'>
                    Price (in BTC):{' '}
                    <span className='text-[#27e7e7]'>
                      {item.item.price_btc}
                    </span>
                  </p>
                </div>
                <div>
                  <p className='text-[#7c7876] text-[.8rem]'>
                    Score:{' '}
                    <span className='text-[#27e7e7]'>{item.item.score}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Trending;
