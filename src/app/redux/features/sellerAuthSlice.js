import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { sellerLogin ,sellerLoginVerify } from "@/app/apis/authApi";



export const sellerLoginThunk = createAsyncThunk(
  "auth/sellerLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await sellerLogin({ ...userData, role: "seller" });

      if (res.success) {
        return {
          email: userData.email
        };
      }

      return rejectWithValue(res.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Seller login failed"
      );
    }
  }
);


export const sellerOtpThunk = createAsyncThunk(
  "auth/sellerOtpVerify",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await sellerLoginVerify(userData);
      return res
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Seller login failed"
      );
    }
  }
);


const sellerAuth = createSlice({
    name: "sellerAuth",
    initialState:{
        seller : null,
        loading : false,
        error : null,
        otpSent : false,
        otpVerified : false,
        tempUser :null,
    },
    reducers:{},
    extraReducers : (builder) =>{
        builder 


          .addCase(sellerLoginThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(sellerLoginThunk.fulfilled, (state, action) => {
             state.loading = false;
             state.otpSent = true;
             state.tempUser = action.payload.email;
           })

           .addCase(sellerLoginThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
           })

            .addCase(sellerOtpThunk.pending, (state) => {
             state.loading = true;
             state.error = null;
           })

           .addCase(sellerOtpThunk.fulfilled, (state) => {
             state.loading = false;
             state.otpVerified = true;
           })

           .addCase(sellerOtpThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
           })

    }
})

export default sellerAuth.reducer