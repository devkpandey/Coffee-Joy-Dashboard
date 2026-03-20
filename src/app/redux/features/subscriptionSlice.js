import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getPlansApi,
  createPlansApi,
  updatePlansApi,
  deletePlansApi,
  getSellerSubscriptionsApi,
} from "@/app/apis/subscription";

// ================== THUNKS ================== //

export const getPlansThunk = createAsyncThunk(
  "subscription/getPlans",
  async (_, { rejectWithValue }) => {
    try {
      return await getPlansApi();
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching plans");
    }
  }
);

export const createPlanThunk = createAsyncThunk(
  "subscription/createPlan",
  async (data, { rejectWithValue }) => {
    try {
      return await createPlansApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating plan");
    }
  }
);

export const updatePlanThunk = createAsyncThunk(
  "subscription/updatePlan",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await updatePlansApi(id, data);
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating plan");
    }
  }
);

export const deletePlanThunk = createAsyncThunk(
  "subscription/deletePlan",
  async (id, { rejectWithValue }) => {
    try {
      await deletePlansApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting plan");
    }
  }
);

export const getSubscriptionsThunk = createAsyncThunk(
  "subscription/getSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      return await getSellerSubscriptionsApi();
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching subscriptions");
    }
  }
);

// ================== SLICE ================== //

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    plans: [],
    subscriptions: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================== GET PLANS ================== //
      .addCase(getPlansThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlansThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(getPlansThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================== CREATE PLAN ================== //
      .addCase(createPlanThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        // optional: push new plan if API returns it
        if (action.payload) {
          state.plans.push(action.payload);
        }
      })
      .addCase(createPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================== UPDATE PLAN ================== //
      .addCase(updatePlanThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { id, data } = action.payload;

        const index = state.plans.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.plans[index] = {
            ...state.plans[index],
            ...data,
          };
        }
      })
      .addCase(updatePlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================== DELETE PLAN ================== //
      .addCase(deletePlanThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.filter(
          (plan) => plan.id !== action.payload
        );
      })
      .addCase(deletePlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================== GET SUBSCRIPTIONS ================== //
      .addCase(getSubscriptionsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscriptionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(getSubscriptionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;