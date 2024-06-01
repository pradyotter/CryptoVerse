import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { MdDarkMode } from 'react-icons/md';
const NavBar = () => {
  return (
    <nav className='w-[100%] '>
      <div className='w-[70%] mx-auto  pt-3 mt-2 flex justify-between items-center'>
        <div className='px-2 flex items-center gap-3'>
          <p className='rounded-full h-[1.4rem] w-[1.4rem]  bg-[#6815e1]'></p>
          <h1 className='fonts text-[1.4rem] font-semibold'>VirtuoVault</h1>
        </div>
        <div className='flex items-center gap-10 px-2 text-[#424242]'>
          <h1 className='fonts text-[1.2rem] cursor-pointer hover:text-black'>
            <Link to='/'>Home</Link>
          </h1>
          <h1 className='fonts text-[1.2rem] cursor-pointer  hover:text-black'>
            <Link to='/market'>Market</Link>
          </h1>
          <h1 className='fonts text-[1.2rem] cursor-pointer  hover:text-black'>
            <Link to='/trending'>Trending</Link>
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
