import api from "@/app/apis/axiosInstace";

// CREATE
export const createCouponApi = async (couponData) => {
  const res = await api.post("/coupon/create", couponData);
  return res.data;
};

// GET ALL
export const getAllCouponsApi = async () => {
  const res = await api.get("/coupon/allcoupons");
  return res.data;
};

// GET BY ID
export const getCouponByIdApi = async (id) => {
  const res = await api.get(`/coupon/couponByID/${id}`);
  return res.data;
};

// UPDATE
export const updateCouponApi = async (id, couponData) => {
  const res = await api.patch(`/coupon/update/${id}`, couponData);
  return res.data;
};

// DELETE
export const deleteCouponApi = async (id) => {
  const res = await api.delete(`/coupon/delete/${id}`);
  return res.data;
};