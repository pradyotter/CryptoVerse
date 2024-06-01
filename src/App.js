import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import Market from './Pages/Market';
import Trending from './Pages/Trending';
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/market' element={<Market />} />
        <Route path='/trending' element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
