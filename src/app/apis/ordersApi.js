import api from "@/app/apis/axiosInstace"

export const getAllOrdersApi = async () => {
  const res = await api.get("/orders/get-all-orders");
  return res.data;
};
