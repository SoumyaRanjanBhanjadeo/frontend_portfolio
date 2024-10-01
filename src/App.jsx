import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin'
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, SetPortfolioData, ShowLoading } from './redux/rootSlice';
import Login from './pages/Admin/Login';

function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/portfolio/get-portfolio-data`);
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
    }
  }

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData()
    }
  }, [portfolioData])

  useEffect(() => {
    if (reloadData) {
      getPortfolioData()
    }
  }, [reloadData])


  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
