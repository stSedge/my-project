import { slice } from "./reducer";

export const{
  setIsAuth,
  setJwt,
  setDiscount,
  setTotalSum,
  setEmail,
  setName,
  setAge,
  setGender,
} = slice.actions;

export default slice.reducer;