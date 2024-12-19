import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store/index.ts";
import { initialState } from "./initState.ts";
import { setTotalSum } from "./index.ts";

export const slice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setJwt : (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    setEmail : (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName : (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDiscount : (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    setAge : (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setGender : (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setTotalSum : (state, action: PayloadAction<number>) => {
      state.total_sum = action.payload;
    }
  }
});

export const userAuthSelector = (state: AppState) => state.default.isAuth;
export const userJwtSelector = (state: AppState) => state.default.jwt;
export const userNameSelector = (state: AppState) => state.default.name;
export const userAgeSelector = (state: AppState) => state.default.age;
export const userGenderSelector = (state: AppState) => state.default.gender;
export const userEmailSelector = (state: AppState) => state.default.email;
export const userDiscountSelector = (state: AppState) => state.default.discount;
export const userTotalSumSelector = (state: AppState) => state.default.total_sum;