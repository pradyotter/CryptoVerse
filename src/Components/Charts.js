import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className='custom-tooltip text-cyan-400'>
        <p className='label'>{`${label} : ${new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'usd',
          minimumFractionDigits: 0,
        }).format(payload[0].value)}
          `}</p>
      </div>
    );
  }

  return null;
}
const Charts = ({ coinInfos }) => {
  const [charts, setcharts] = useState();
  const [type, setType] = useState('prices');

  console.log(charts);
  const getChartsInfo = async () => {
    try {
      const days = 7; // Example: Fetch data for the last 7 days
      const interval = 'daily'; // Example: Fetch daily data

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinInfos}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`
      );

      const result = await response.json();
      let convertedData = result[type].map((item) => {
        return {
          date: new Date(item[0]).toLocaleString(),
          [type]: item[1],
        };
      });
      setcharts(convertedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartsInfo();
  }, [coinInfos, type]);
  return (
    <div className='h-[60%] w-[50%] mx-auto opacity-[.9]'>
      <ResponsiveContainer height={'90%'}>
        <LineChart
          className='mx-auto mt-4 px-2 '
          width={400}
          height={400}
          data={charts}
        >
          <Line
            type='monotone'
            dataKey={type}
            stroke='#14ffec'
            strokeWidth={'1px'}
          />
          <CartesianGrid
            stroke='#ccc'
            className='opacity-[.9]'
            strokeDasharray='#323232'
          />
          <XAxis dataKey='date' hide />
          <YAxis dataKey={type} hide domain={['auto', 'auto']} />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: 'none' }}
            cursor={false}
          />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
      <div className='flex text-white gap-3 mt-5'>
        <button
          className={
            type === 'prices'
              ? 'bg-[#1f5a55] text-[#16dece] px-3 rounded'
              : 'bg-[#2e2e2e] text-[#6a6a6a] px-3 rounded'
          }
          onClick={() => {
            setType('prices');
          }}
        >
          Price
        </button>
        <button
          className={
            type === 'market_caps'
              ? 'bg-[#1f5a55] text-[#16dece] px-3 rounded'
              : 'bg-[#2e2e2e] text-[#6a6a6a] px-3 rounded'
          }
          onClick={() => setType('market_caps')}
        >
          Market Cap
        </button>
        <button
          className={
            type === 'total_volumes'
              ? 'bg-[#1f5a55] text-[#16dece] px-3 rounded'
              : 'bg-[#2e2e2e] text-[#6a6a6a] px-3 rounded'
          }
          onClick={() => setType('total_volumes')}
        >
          Volume
        </button>
      </div>
    </div>
  );
};

export default Charts;
