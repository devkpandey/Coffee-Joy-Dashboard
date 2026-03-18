import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrdersApi } from "@/app/apis/ordersApi";

export const getAllOrdersThunk = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllOrdersApi();

      console.log("FULL RESPONSE:", res.data); 
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching orders");
    }
  }
);


const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.data || action.payload || [];
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;