import React from 'react';
import crypto from '../images/Wavy_Tech-24_Single-07.jpg';

import { Link } from 'react-router-dom';
import '../App.css';
const Home = () => {
  return (
    <div className=' mt-4 w-full'>
      <div className='w-[80%]  mx-auto flex items-center justify-evenly'>
        <div className=' w-[30%]'>
          <h1 className='text-[3rem] capitalize tracking-[.3em]  font-bold fonts '>
            Your Gateway to
            <br /> the Cryptoverse.
          </h1>
        </div>
        <div>
          <img className='w-[40rem] h-[40rem]' src={crypto} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Home;
