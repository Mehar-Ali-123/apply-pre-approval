import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from './authService';
// const API_URL = 'http://localhost:1200/api/v1';
// const API_URL = 'https://apply-oqvest-api.vercel.app';
const API_URL = 'https://api.oqteq.com/api/v1';

const initialState = {
    user: null,
    company: null,
    loading: true,
    error: false,
    message: ""
}

export const getCompany = createAsyncThunk(
    API_URL + "/company",
    async (url, thunkApi) => {
        try {
            const res = await authService.getCompany(url);
            if (res) {
                return res;
            } else {
                return thunkApi.rejectWithValue("Invalid url!");
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error.message) ||
                error.message ||
                error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    API_URL + "/user/login",
    async (user, thunkApi) => {
        try {
            const res = await authService.login(user);
            if (res) {
                return res;
            } else {
                return thunkApi.rejectWithValue("Invalid email/password!");
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error.message) ||
                error.message ||
                error.toString();

            return thunkApi.rejectWithValue(message);
        }
    }
);

export const currentUser = createAsyncThunk(
    API_URL + "/user",
    async (userId, thunkApi) => {
        try {
            const res = await authService.getUser(userId);
            if (res) {
                return res;
            } else {
                return thunkApi.rejectWithValue("Invalid email/password!");
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error.message) ||
                error.message ||
                error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loading = true;
            state.error = false;
            state.user = action.payload;
            state.loading = false;
        },
        logout: (state, action) => {
            state.loading = true;
            state.user = null;
            state.company = null;
            state.error = false;
            state.loading = false;
            state.message = "";
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.data;
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null;
                state.error = true;
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(getCompany.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCompany.fulfilled, (state, action) => {
                state.company = action.payload.data;
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.company = null;
                state.error = true;
                state.message = "Session Expired! Please Login!";
            })
            .addCase(currentUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.user = action.payload.data;
                state.loading = false;
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.user = null;
                state.error = true;
                state.loading = false;
                state.message = "Session Expired! Please Login!";
            })
    },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;