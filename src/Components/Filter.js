import React, { useContext, useRef, useState } from 'react';
import Search from './Search';
import { CryptoContext } from '../context/CryptoContext';

const Filter = () => {
  const { setCurrency } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = '';
  };
  return (
    <div className='w-[80%]  mx-auto mt-10  '>
      <div className='w-[60%] bg-[#212121] flex items-center gap-8   rounded-lg mx-auto border border-[#3B424E] p-2'>
        <Search />
        <div className='text-white '>
          <form className='flex gap-2 ' onSubmit={handleCurrencySubmit}>
            <label htmlFor='currency '>Currency:</label>
            <input
              className='rounded outline-none w-[4rem] bg-[#3B404A] px-2 text-white placeholder:text-gray-400 '
              name='currency'
              type='text'
              placeholder='usd'
              ref={currencyRef}
            />
            <button className='fonts' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Filter;
