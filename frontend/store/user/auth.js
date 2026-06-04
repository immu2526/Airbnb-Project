import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// singup

export const authUser = createAsyncThunk(
  "api/singup",
  async (
    { username: username, email: email, password: password },
    { rejectWithValue }
  ) => {
    try {
      let response = await axios.post(
        "https://airbnb-project-ex9c.onrender.com/api/auth/singup",
        { username, email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// login

export const authLogin = createAsyncThunk(
  "api/login",
  async ({ username: username, password: password }, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        "https://airbnb-project-ex9c.onrender.com/api/auth/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// logout

export const authLogout = createAsyncThunk(
  "api/logout",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(
        "https://airbnb-project-ex9c.onrender.com/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// checkAuth

export const checkAuth = createAsyncThunk(
  "api/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(
        "https://airbnb-project-ex9c.onrender.com/api/auth/checkaouth",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// initialization

const initialState = {
  isLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        (state.isLoading = false), (state.user = null);
      })
      .addCase(authLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(authLogout.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
