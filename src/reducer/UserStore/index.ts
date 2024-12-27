import { slice } from "./reducer";

export const{
  setIsAuth,
  setIsAdmin,
  setJwt,
  setDiscount,
  setTotalSum,
  setEmail,
  setName,
  setAge,
  setGender,
  setId,
} = slice.actions;

export default slice.reducer;