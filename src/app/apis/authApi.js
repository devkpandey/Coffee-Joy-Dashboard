import api from "@/app/apis/axiosInstace"

export const sellerLogin = async (sellerData)=>{
     const response = await api.post("/auth/login" , sellerData)
     return response.data
}

export const sellerLoginVerify = async (sellerData)=>{
     const response = await api.post("/auth/seller/login/verify-otp" , sellerData)
     return response.data
}