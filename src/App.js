import React, { useState, useEffect } from "react";
import './App.css';
import axiosObj from './axiosObj';

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import Header from './components/partials/Header/Header';
import Signin from './components/Auth/Signin';
import PackageList from './container/PackageList/PackageList';
import Order from './components/Order/Order';
import * as ActionTypes from './store/actions/index';

function App(props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.tryAutoSignin()
      .then(res => {
        if (res) {
          navigate('/packages');
        }
      })
      .catch(err => {
        navigate('/signin');
      })
  }, []);

  let authProtectedRoutes = null

  if (props.authenticated) {
    authProtectedRoutes = (<> <Route path="/packages" element={<PackageList />} />
      <Route path="/packages/:id/order" element={<Order />} /></>
    )
  }

  return (<>
    <Header />
    <Routes>

      <Route path="/" element={<Navigate replace to="/packages" />} />

      {authProtectedRoutes}

      <Route path="/signin" element={<Signin />} />
    </Routes>

  </>);
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignin: () => dispatch(ActionTypes.tryAutoSignin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);