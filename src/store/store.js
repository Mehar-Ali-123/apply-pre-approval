import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/authSlice'
import dataReducer from '../Pages/Pre-Approval/incomeInformation/DataSlice'; 
import dataPresentPrimarySlice from '../Pages/Pre-Approval/incomeInformation/PrimaryDataSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
        dataPrimary: dataPresentPrimarySlice,
    }
})
