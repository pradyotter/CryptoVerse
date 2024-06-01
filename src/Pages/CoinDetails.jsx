import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { TbTriangle, TbTriangleInverted } from 'react-icons/tb';
import Charts from '../Components/Charts';

const CoinDetails = () => {
  const { coinInfos } = useContext(CryptoContext);
  console.log(coinInfos);
  const [green, setGreen] = useState(0);

  useEffect(() => {
    let total =
      coinInfos.market_data.high_24h.usd - coinInfos.market_data.low_24h.usd;
    let priceDifference =
      coinInfos.market_data.current_price.usd -
      coinInfos.market_data.low_24h.usd;
    let greenZone = (priceDifference * 100) / total;

    // Ensure greenZone is within [0, 100]
    greenZone = Math.max(0, Math.min(100, greenZone));

    setGreen(Math.ceil(greenZone));
  }, [coinInfos]);

  return (
    <div className='w-[60%] rounded flex mx-auto left-[24rem] top-[14rem] h-auto absolute  bg-[#252525] '>
      {/* Left Hand Side */}

      <div className='lefthandSide w-[40%] h-auto px-2 py-1 '>
        <div className='flex flex-col '>
          <div className='flex  gap-3 items-center'>
            <img src={coinInfos.image.large} className='w-10 h-10' alt='' />
            <h1 className='fonts-2 text-white text-[32px]'>{coinInfos.name}</h1>
            <p className='bg-[#1f5a55] uppercase rounded text-[14px] px-2 text-[#16dece]'>
              {coinInfos.symbol}
            </p>
          </div>
        </div>
        <div className='mt-4 '>
          {/* Price Info */}
          <div className='flex w-full justify-between '>
            <div>
              <p className='text-[#747474]'>Price</p>
              <h1 className='mt-3 text-white text-[24px]'>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'usd',
                }).format(coinInfos.market_data.current_price.usd)}
              </h1>
            </div>
            <div>
              <p
                className={
                  coinInfos.market_data.price_change_percentage_24h > 0
                    ? 'bg-[#235137] text-[#25d470] px-2 flex items-center gap-4'
                    : 'bg-[#502b36] text-[#9d3956] px-2 flex items-center'
                }
              >
                {coinInfos.market_data.price_change_percentage_24h.toFixed(3) +
                  ' %'}
                {coinInfos.market_data.price_change_percentage_24h > 0 ? (
                  <TbTriangle />
                ) : (
                  <TbTriangleInverted />
                )}{' '}
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between mt-4 '>
            <div>
              <p className='text-[14px]  text-[#747474]'>Market Cap</p>
              <p className='text-white text-[16px] mt-3'>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  minimumFractionDigits: 0,
                  currency: 'usd',
                }).format(coinInfos.market_data.market_cap.usd)}
              </p>
            </div>
            <div className='flex flex-col gap-3 '>
              <p className='text-[14px] text-[#747474]'>
                Fully Diluted Valuation
              </p>
              <p className='text-white text-[16px]'>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  notation: 'compact',
                  currency: 'usd',
                }).format(coinInfos.market_data.fully_diluted_valuation.usd)}
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between mt-4 '>
            <div>
              <p className='text-[14px]  text-[#747474]'>Total Volume</p>
              <p className='text-white text-[16px] mt-3'>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'usd',
                  minimumFractionDigits: 0,
                }).format(coinInfos.market_data.total_volume.usd)}
              </p>
            </div>
          </div>

          <div className='mt-3 flex items-center'>
            <div
              style={{
                width: `${green}%`,
                backgroundColor: '#16dece',
                height: '5px',
              }}
              className='w-[50%] h-1'
            ></div>
            <div
              style={{
                width: `${100 - green}%`,
                backgroundColor: '#f44336',
                height: '5px',
              }}
              className='w-[50%] h-1'
            ></div>
          </div>

          <div className='flex items-center justify-between mt-4 '>
            <div>
              <p className='text-[14px]  text-[#747474]'>Low 24H</p>
              <p className='text-white text-[16px] mt-3'>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  minimumFractionDigits: 0,
                  currency: 'usd',
                }).format(coinInfos.market_data.low_24h.usd)}
              </p>
            </div>
            <div className='flex flex-col gap-3 '>
              <p className='text-[14px] text-[#747474]'>High 24H</p>
              <p className='text-white text-[16px]'>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',

                  currency: 'usd',
                }).format(coinInfos.market_data.high_24h.usd)}
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between mt-4 '>
            <div>
              <p className='text-[14px]  text-[#747474]'>Market Cap Rank</p>
              <p className='text-white text-[16px] mt-3'>
                {coinInfos.market_data.market_cap_rank}
              </p>
            </div>
            <div className='flex flex-col gap-3 '>
              <p className='text-[14px] text-[#747474]'>Circulating Supply</p>
              <p className='text-white text-[16px]'>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',

                  currency: 'usd',
                }).format(coinInfos.market_data.circulating_supply)}
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between mt-4 '>
            <div className=' flex flex-col gap-2 '>
              <a
                href={coinInfos.links.homepage[0]}
                className='bg-[#323232] text-[#747474] px-2 py-1 '
              >
                {coinInfos.links.homepage[0]}
              </a>
              <a
                href={coinInfos.links.blockchain_site[0]}
                className='bg-[#323232] text-[#747474] px-2 py-1 '
              >
                {coinInfos.links.blockchain_site[0].substring(0, 20)}
              </a>
              <a
                href={coinInfos.links.blockchain_site[1]}
                className='bg-[#323232] text-[#747474] px-2 py-1 '
              >
                {coinInfos.links.blockchain_site[1].substring(0, 20)}
              </a>
            </div>
            <div className='flex flex-col gap-3 '>
              <p className='text-[14px] text-[#747474]'>Sentiment</p>
              <div className='flex flex-col gap-2'>
                <div className='bg-[#235137] rounded px-2'>
                  <p className='text-[#24bb65] flex items-center gap-2'>
                    {coinInfos.sentiment_votes_up_percentage}%
                    <TbTriangle />
                  </p>
                </div>
                <div className='bg-[#512c37] rounded px-2'>
                  <p className='text-[#d6436e] flex items-center gap-2'>
                    {coinInfos.sentiment_votes_down_percentage}%
                    <TbTriangleInverted />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*End of  Left Hand Side */}

      {/* RightHand Side */}

      <div className='w-[60%]  '>
        <div className=' w-full h-full '>
          <Charts coinInfos={coinInfos.id} />
        </div>
      </div>

      {/* End of RightHand Side */}
    </div>
  );
};

export default CoinDetails;
