import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowed: true,
  type: 'booking',
};

const modalSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showModal(state) {
      state.isShowed = true;
    },
    hideModal(state) {
      state.isShowed = false;
      console.log('hide');
    },
    setModalType(state, action) {
      state.type = action.payload;
    },
  },
});

export const modal = modalSlice.reducer;
export const { showModal, hideModal, setModalType } = modalSlice.actions;
