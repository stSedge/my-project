import React, { useState } from 'react';
import axios from '../axiosConfig.ts';
import { useSelector } from "react-redux";
import { userAgeSelector, userAuthSelector, userDiscountSelector, 
  userEmailSelector, userGenderSelector, userNameSelector, userTotalSumSelector } 
  from "../reducer/UserStore/reducer.ts"; 

const HomePage: React.FC = () => {
  const isAuth = useSelector(userAuthSelector);
  const name = useSelector(userNameSelector);
  const age = useSelector(userAgeSelector);
  const discount = useSelector(userDiscountSelector);
  const email = useSelector(userEmailSelector);
  const totalSum = useSelector(userTotalSumSelector);
  const gender = useSelector(userGenderSelector);



  return (
    <div>
      {isAuth ? (
         <div>
          <h2>Добро пожаловать в ваш личный кабинет, {name} ! </h2> 
          <p>Сумма покупок: {totalSum}</p>
          <p>Cкидка: {discount}%</p>
        </div>
      ) 
      
      
      : (
        <h2>Пожалуйста, войдите в свою учетную запись.</h2> 
      )}
    </div>
  );
};

export default HomePage;
