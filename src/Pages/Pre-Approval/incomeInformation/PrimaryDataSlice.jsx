import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDataPresentPrimary: false,

};
const dataPresentPrimarySlice = createSlice({
  name: 'dataPrimary',
  initialState,
  reducers: {
    setIsDataPresentPrimary: (state, action) => {
      state.isDataPresentPrimary = action.payload;
    },
  },
});

export const { setIsDataPresentPrimary } = dataPresentPrimarySlice.actions;

export default dataPresentPrimarySlice.reducer;