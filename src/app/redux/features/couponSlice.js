import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCouponApi,
  getAllCouponsApi,
  getCouponByIdApi,
  updateCouponApi,
  deleteCouponApi,
} from "@/app/apis/coupons";

// ================= GET ALL =================
export const getCouponsThunk = createAsyncThunk(
  "coupon/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCouponsApi();
      return res.coupons; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= CREATE =================
export const createCouponThunk = createAsyncThunk(
  "coupon/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createCouponApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= GET BY ID =================
export const getCouponByIdThunk = createAsyncThunk(
  "coupon/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getCouponByIdApi(id);
      return res.coupon;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= UPDATE =================
export const updateCouponThunk = createAsyncThunk(
  "coupon/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCouponApi(id, data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= DELETE =================
export const deleteCouponThunk = createAsyncThunk(
  "coupon/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCouponApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= SLICE =================
const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    singleCoupon: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(getCouponsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCouponsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(getCouponsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(getCouponByIdThunk.fulfilled, (state, action) => {
        state.singleCoupon = action.payload;
      })

      // CREATE
      .addCase(createCouponThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCouponThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCouponThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCouponThunk.fulfilled, (state) => {
        state.loading = false;
      })

      // DELETE
      .addCase(deleteCouponThunk.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export default couponSlice.reducer;