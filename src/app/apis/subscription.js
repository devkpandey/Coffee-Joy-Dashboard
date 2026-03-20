import api from "@/app/apis/axiosInstace"

export const getPlansApi = async () => {
  const res = await api.get("/subscription/plan");
  return res.data;
};

export const createPlansApi = async (planData) => {
    const res = await api.post("/subscription/plan", planData);
    return res.data;
}

export const updatePlansApi = async (planId, planData) => {
    const res = await api.put(`/subscription/plan/${planId}`, planData);
    return res.data;
}

export const deletePlansApi = async (planId) => {
    const res = await api.delete(`/subscription/plan/${planId}`);
    return res.data;
}

export const getSellerSubscriptionsApi = async () => {
    const res = await api.get("/subscription/seller/subscriptions");
    return res.data;
}
