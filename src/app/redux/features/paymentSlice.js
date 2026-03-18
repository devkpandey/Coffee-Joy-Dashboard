"use client";

import { getAllPaymentsApi, getRefundPaymentsApi } from "@/app/apis/paymentsApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




export const fetchAllPayments = createAsyncThunk(
  "payments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllPaymentsApi();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching payments");
    }
  }
);


export const refundPaymentThunk = createAsyncThunk(
  "payments/refund",
  async (paymentId, { rejectWithValue }) => {
    try {
      const res = await getRefundPaymentsApi(paymentId);
      return { paymentId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Refund failed");
    }
  }
);



const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    payments: [],
    loading: false,
    error: null,
    refundLoading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ==========================
         FETCH PAYMENTS
      ========================== */
      .addCase(fetchAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ==========================
         REFUND PAYMENT
      ========================== */
      .addCase(refundPaymentThunk.pending, (state) => {
        state.refundLoading = true;
      })
      .addCase(refundPaymentThunk.fulfilled, (state, action) => {
        state.refundLoading = false;

        const { paymentId } = action.payload;

        state.payments = state.payments.map((p) =>
          p.id === paymentId ? { ...p, status: "REFUNDED" } : p
        );
      })
      .addCase(refundPaymentThunk.rejected, (state, action) => {
        state.refundLoading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;