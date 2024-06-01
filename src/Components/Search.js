import React, { useContext, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { CryptoContext } from '../context/CryptoContext';
import debounce from 'lodash.debounce';
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const { getCryptoSearch, searchData, setCoinSearch, setSearchData } =
    useContext(CryptoContext);
  const debounceFunc = debounce(function (val) {
    getCryptoSearch(val);
  }, 2000);

  const handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    debounceFunc(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const selectCoins = (coin) => {
    setCoinSearch(coin);
    setSearchData([]);
    setSearchText('');
  };

  return (
    <>
      <div>
        <form className='flex items-center relative' onSubmit={handleSubmit}>
          <input
            value={searchText}
            onChange={handleInput}
            className=' placeholder:text-white  text-white rounded px-[.5rem] py-1 bg-[#3B404A] outline-none w-[18rem]'
            type='text'
            placeholder='Search here...'
          />
          <button className='absolute left-[16rem] '>
            <IoIosSearch className=' w-5 h-auto' color='white' />
          </button>
        </form>
      </div>
      {searchText.length > 0 ? (
        <ul className='absolute  bg-gray-200 top-[10rem] mx-auto w-[48%] h-[40%] overflow-scroll backdrop-blur-md bg-opacity-60'>
          {searchData && searchData.length > 0 ? (
            searchData.map((coin) => {
              return (
                <li
                  key={coin.id}
                  className='flex items-center  gap-4'
                  onClick={() => selectCoins(coin.id)}
                >
                  <div>
                    <img
                      src={coin.thumb}
                      className='w-[1rem] h-[1rem]'
                      alt=''
                    />
                  </div>
                  <div>
                    <p>{coin.name}</p>
                  </div>
                </li>
              );
            })
          ) : (
            <div className='w-full h-full'>
              <div className='flex items-center  gap-4 justify-center mt-8 '>
                <div>
                  <span class='loader'></span>
                </div>
                <div>
                  <p className='fonts text-lg'>Searching...</p>
                </div>
              </div>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

export default Search;
