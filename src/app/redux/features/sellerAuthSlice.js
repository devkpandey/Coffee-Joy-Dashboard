import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const sellerLoginThunk = createAsyncThunk(
  "auth/sellerLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await login({ ...userData, role: "seller" });

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
             toast.success("OTP sent to your email");
           })

           .addCase(sellerLoginThunk.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
             toast.error(action.payload);
           })

    }
})

export default sellerAuth.reducer