import { configureStore } from "@reduxjs/toolkit";
import sellerReducer from "@/app/redux/features/sellerAuthSlice";
import ordersReducer from "@/app/redux/features/ordersSlice";
import paymentReducer from "@/app/redux/features/paymentSlice";

const store = configureStore({
    reducer : {
       seller : sellerReducer,
       orders : ordersReducer,
       payments : paymentReducer,
    }
})

export default store;