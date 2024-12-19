import React, { useState } from 'react';
import axios from '../axiosConfig.ts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setJwt } from '../reducer/UserStore/index.ts';
import { setIsAuth } from '../reducer/UserStore/index.ts';

const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setJwt(''));
    dispatch(setIsAuth(false));
    navigate("/login");
  };

  return (
    <div>
      <h2>Выйти из аккаунта</h2>
      <button onClick={handleLogout}>Выход</button>
    </div>
  );
};

export default LogoutPage;
