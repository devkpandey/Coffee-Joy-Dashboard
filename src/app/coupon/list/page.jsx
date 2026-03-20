"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCouponsThunk,
  deleteCouponThunk,
  updateCouponThunk,
} from "@/app/redux/features/couponSlice";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Pencil, Trash, XCircle } from "lucide-react";

export default function CouponsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { coupons, loading } = useSelector((state) => state.coupon);

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getCouponsThunk());
  }, [dispatch]);

  // DELETE
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      const res = await dispatch(deleteCouponThunk(id));
      if (res.meta.requestStatus === "fulfilled") {
        alert("✅ Coupon deleted successfully");
      } else {
        alert("❌ Failed to delete coupon");
      }
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!selectedCoupon) return;

    const payload = {
      apply_to: selectedCoupon.apply_to || "CART",
is_active: selectedCoupon.is_active ? 1 : 0,
discount_value: Number(selectedCoupon.discount_value) || 0,
min_cart_amount: Number(selectedCoupon.min_cart_amount) || 0,
coupon_type: selectedCoupon.coupon_type || "DISCOUNT",
      apply_to:
        selectedCoupon.apply_to === "" ||
        !selectedCoupon.apply_to
          ? "CART"
          : selectedCoupon.apply_to,
      is_active:
        selectedCoupon.is_active === true ||
        selectedCoupon.is_active === "true" ||
        selectedCoupon.is_active === 1
          ? 1
          : 0,
    };

    try {
      const res = await dispatch(
        updateCouponThunk({ id: selectedCoupon.id, data: payload })
      );
      if (res.meta.requestStatus === "fulfilled") {
        alert("✅ Coupon updated successfully");
        dispatch(getCouponsThunk());
        setEditMode(false);
        setSelectedCoupon(null);
      } else {
        alert(
          "❌ Update failed: " + (res.payload?.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error(err);
      alert("❌ Update failed: " + err.message);
    }
  };

  return (
    <DashboardLayout title="Coupons">
      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Coupons</h1>
          <button
            onClick={() => router.push("/coupon/create")}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            + Create Coupon
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Min Cart</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    No coupons found
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedCoupon(c);
                      setEditMode(false);
                    }}
                  >
                    <td className="p-3">{c.coupon_code}</td>
                    <td>{c.coupon_type}</td>
                    <td>{c.discount_value}</td>
                    <td>{c.min_cart_amount}</td>
                    <td className="text-center">
                      <div className="flex justify-center gap-3">
                        {/* Edit */}
                        <button
                          onClick={() => {
                            setSelectedCoupon(c);
                            setEditMode(true);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                          title="Delete"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* POPUP */}
        {selectedCoupon && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg relative">
              <XCircle
                size={24}
                className="absolute top-3 right-3 cursor-pointer text-red-500"
                onClick={() => setSelectedCoupon(null)}
              />
              <h2 className="text-lg font-bold mb-3">Coupon Details</h2>

              {!editMode ? (
                <div className="space-y-1">
                  <p>
                    <b>Code:</b> {selectedCoupon.coupon_code}
                  </p>
                  <p>
                    <b>Type:</b> {selectedCoupon.coupon_type}
                  </p>
                  <p>
                    <b>Discount:</b> {selectedCoupon.discount_value}
                  </p>
                  <p>
                    <b>Min Cart:</b> {selectedCoupon.min_cart_amount}
                  </p>
                  <p>
                    <b>Apply To:</b> {selectedCoupon.apply_to || "CART"}
                  </p>
                  <p>
                    <b>Status:</b>{" "}
                    {selectedCoupon.is_active ? "Active" : "Inactive"}
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    value={selectedCoupon.coupon_code || ""}
                    onChange={(e) =>
                      setSelectedCoupon({
                        ...selectedCoupon,
                        coupon_code: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded"
                  />
                  <input
                    type="number"
                    value={selectedCoupon.discount_value || 0}
                    onChange={(e) =>
                      setSelectedCoupon({
                        ...selectedCoupon,
                        discount_value: Number(e.target.value) || 0,
                      })
                    }
                    className="border p-2 w-full rounded"
                  />
                  <input
                    type="number"
                    value={selectedCoupon.min_cart_amount || 0}
                    onChange={(e) =>
                      setSelectedCoupon({
                        ...selectedCoupon,
                        min_cart_amount: Number(e.target.value) || 0,
                      })
                    }
                    className="border p-2 w-full rounded"
                  />
                  <select
                    value={selectedCoupon.coupon_type || "DISCOUNT"}
                    onChange={(e) =>
                      setSelectedCoupon({
                        ...selectedCoupon,
                        coupon_type: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded"
                  >
                    <option value="DISCOUNT">DISCOUNT</option>
                    <option value="GIFT">GIFT</option>
                  </select>
                  <select
                    value={selectedCoupon.apply_to || "CART"}
                    onChange={(e) =>
                      setSelectedCoupon({
                        ...selectedCoupon,
                        apply_to: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded"
                  >
                    <option value="CART">CART</option>
                    <option value="CATEGORY">CATEGORY</option>
                  </select>
                  <select
                    value={selectedCoupon.is_active ? "1" : "0"}
                    onChange={(e) =>
                      setSelectedCoupon({
                        ...selectedCoupon,
                        is_active: e.target.value === "1" ? 1 : 0,
                      })
                    }
                    className="border p-2 w-full rounded"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>

                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="border px-3 py-1 rounded hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}