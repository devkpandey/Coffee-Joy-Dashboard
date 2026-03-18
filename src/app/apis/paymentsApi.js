import api from "@/app/apis/axiosInstace"

export const getAllPaymentsApi = async () => {
  const res = await api.get("/payment/all");
  return res.data;
};


export const getRefundPaymentsApi = async () => {
  const res = await api.get("/payment/refund");
  return res.data;
};
