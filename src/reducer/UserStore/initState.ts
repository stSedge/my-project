interface userStoreInterface {
    isAuth: boolean,
    jwt: string | null,
    email: string | null,
    name: string | null,
    age: number | null, 
    gender: string | null,
    total_sum: number | null,
    discount: number | null,
    isAdmin: boolean | null,
    id: number | null
  }
  
  export const initialState: userStoreInterface = {
    isAuth: false,
    jwt: null,
    email: null,
    name: null,
    age: null, 
    gender: null,
    total_sum: 0,
    discount: 0,
    isAdmin: false,
    id: null
  };