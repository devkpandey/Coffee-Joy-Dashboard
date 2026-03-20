import { configureStore } from "@reduxjs/toolkit";
import sellerReducer from "@/app/redux/features/sellerAuthSlice";
import ordersReducer from "@/app/redux/features/ordersSlice";
import paymentReducer from "@/app/redux/features/paymentSlice";
import subscriptionReducer from "@/app/redux/features/subscriptionSlice";
import couponReducer from "@/app/redux/features/couponSlice"

const store = configureStore({
    reducer : {
       seller : sellerReducer,
       orders : ordersReducer,
       payments : paymentReducer,
       subscription : subscriptionReducer,
       coupon : couponReducer,
    }
})

export default store;