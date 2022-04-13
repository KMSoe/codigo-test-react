import React, { useState, useEffect } from "react";
import './App.css';
import axiosObj from './axiosObj';

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from './components/partials/Header/Header';
import Signin from './components/Auth/Signin';
import PackageList from './container/PackageList/PackageList';
import Order from './components/Order/Order';

function App() {
  let [auth, setAuth] = useState(false);
  let [user, setUser] = useState(null);
  let [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    tryAutoLogin();
  }, []);

  const tryAutoLogin = () => {
    axiosObj.get(`/user`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setAuth(true);
        setUser(res.data.data.user);
        navigate('/packages')
      })
      .catch(err => {
        setAuth(false);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/signin');
      })
  }
  const logout = () => {
    setAuth(false);
    setUser(null);
    navigate('/signin');
  }
  return (<>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate replace to="/packages" />} />
      <Route path="/packages" element={<PackageList token={token} />} />
      <Route path="/packages/:id/order" element={<Order token={token} />} />

      <Route path="signin" element={<Signin user={setUser} auth={setAuth} token={setToken} />} />
    </Routes>


  </>);
}

export default App;