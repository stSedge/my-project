import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store/index";
import { initialState } from "./initState";
import { setTotalSum } from "./index";

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
    },
    setId : (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setIsAdmin : (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    }
  }
});

export const userAuthSelector = (state: AppState) => state.userStore.isAuth;
export const userIdSelector = (state: AppState) => state.userStore.id;
export const userAdminSelector = (state: AppState) => state.userStore.isAdmin;
export const userJwtSelector = (state: AppState) => state.userStore.jwt;
export const userNameSelector = (state: AppState) => state.userStore.name;
export const userAgeSelector = (state: AppState) => state.userStore.age;
export const userGenderSelector = (state: AppState) => state.userStore.gender;
export const userEmailSelector = (state: AppState) => state.userStore.email;
export const userDiscountSelector = (state: AppState) => state.userStore.discount;
export const userTotalSumSelector = (state: AppState) => state.userStore.total_sum;