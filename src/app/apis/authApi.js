import api from "@/app/apis/axiosInstace"

export const sellerLogin = async (sellerData)=>{
     const response = await api.post("/auth/login" , sellerData)
     return response.data
}