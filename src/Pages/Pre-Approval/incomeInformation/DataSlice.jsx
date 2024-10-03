import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  activePreApprovalDashboard: false,

};
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setActivePreApprovalDashboard: (state, action) => {
      state.activePreApprovalDashboard = action.payload;
    }
    // ... other reducers
  },
});
export const { setActivePreApprovalDashboard } = dataSlice.actions;
export default dataSlice.reducer;