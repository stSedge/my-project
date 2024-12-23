interface loadingStateInterface {
    loading: boolean;
    error: string | null;
    showErrorModal: boolean;
  }
  
  export const initialState: loadingStateInterface = {
    loading: false,
    error: null,
    showErrorModal: false,
  };
  