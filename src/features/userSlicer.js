import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../api/User";
import {
  clearStorage,
  setToken,
  setUser,
} from "../services/helper";

const initialState = {
  loading: false,
  user: null,
  token: null,
  message: null,
  error: null,
  isAuthenticated: false,
};

// Login user action
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (user, { rejectWithValue }) => {
    try {
      const results = await loginUser(user);
      if (results.success) {
        const { token, user } = results.data;
        await setToken(token);
        await setUser(user);
        return { user, token };
      }
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data.error);
    }
  }
);



// Logout action
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await clearStorage();
});



const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = "Successfully logged in";
        state.error = null;
        state.isAuthenticated = true
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.message = "Successfully logged out";
        state.error = null;
        state.isAuthenticated = false
      })
   
  },
});

export default userSlice.reducer;
