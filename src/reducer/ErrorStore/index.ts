import { slice } from "./reducer";

export const{
    startLoading, 
    stopLoading, 
    setError,
    clearError
} = slice.actions;

export default slice.reducer;