import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css';
import axiosObj from './axiosObj';

import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
    axiosObj.get(`http://localhost:8000/api/user`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setAuth(true);
        setUser(res.data.data.user);
        navigate('/packages')
      })
      .catch(err => {
        setAuth(false);
        setUser(null);
        navigate('/signin');
      })
  }
  const logout = () => {
    setAuth(false);
    setUser(null);
    navigate('/signin');
  }
  return (<>
    <Header auth={auth} user={user} token={token} logout={logout} />
    <Routes>
      <Route path="/" element={<Navigate replace to="/packages" />} />
      <Route path="/packages" element={<PackageList token={token} />} />
      <Route path="orders/:id" element={<Order user={user} token={token} />} />

      <Route path="signin" element={<Signin user={setUser} auth={setAuth} />} />
    </Routes>


  </>);
}

export default App;