import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowed: false,
  selectedBook: 0,
  type: 'booking',
  isBookedMyself: false,
};

const modalSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showModal(state, action) {
      state.isShowed = true;
      state.selectedBook = action.payload.id;
      state.isBookedMyself = action.payload.isBookedMyself;
    },
    hideModal(state) {
      state.isShowed = false;
    },
    setModalType(state, action) {
      state.type = action.payload;
    },
  },
});

export const modal = modalSlice.reducer;
export const { showModal, hideModal, setModalType } = modalSlice.actions;
