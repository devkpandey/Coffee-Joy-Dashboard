import { configureStore } from "@reduxjs/toolkit";
import sellerReducer from "@/app/redux/features/sellerAuthSlice"

const store = configureStore({
    reducer : {
       seller : sellerReducer,
       
    }
})

export default store;