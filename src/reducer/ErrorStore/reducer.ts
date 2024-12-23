import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initState';
import { AppState } from '../../store/index';

export const slice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
      state.showErrorModal = false;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.showErrorModal = true;
    },
    clearError(state) {
      state.error = null;
      state.showErrorModal = false;
    },
  },
});

export const loadingSelector = (state: AppState) => state.errorStore.loading;
export const errorSelector = (state: AppState) => state.errorStore.error;
export const showErrorModalSelector = (state: AppState) => state.errorStore.showErrorModal;
