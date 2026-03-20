"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCouponThunk } from "@/app/redux/features/couponSlice";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CreateCoupon() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    coupon_code: "",
    coupon_type: "DISCOUNT",
    discount_value: "",
    max_discount: "",
    min_cart_amount: "",
    apply_to: "CART",
    category_id: "",
    valid_from: "",
    valid_till: "",
    custom_text: "",
    is_active: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Send null for optional fields
    const payload = {
      ...form,
      max_discount: form.max_discount || null,
      category_id: form.category_id || null,
      valid_from: form.valid_from || null,
      valid_till: form.valid_till || null,
      custom_text: form.custom_text || null,
    };

    console.log("SENDING DATA:", payload);

    const res = await dispatch(createCouponThunk(payload));

    console.log("RESPONSE:", res);

    if (res.meta.requestStatus === "fulfilled") {
      alert("✅ Coupon Created Successfully");

      // reset form
      setForm({
        coupon_code: "",
        coupon_type: "DISCOUNT",
        discount_value: "",
        max_discount: "",
        min_cart_amount: "",
        apply_to: "CART",
        category_id: "",
        valid_from: "",
        valid_till: "",
        custom_text: "",
        is_active: true,
      });
    } else {
      alert(`❌ ${res.payload?.message || "Failed to create coupon"}`);
    }
  };

  return (
    <DashboardLayout title="Create Coupon">
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4">Create Coupon</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Coupon Code */}
          <input
            value={form.coupon_code}
            placeholder="Coupon Code"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, coupon_code: e.target.value })
            }
          />

          {/* Coupon Type */}
          <select
            value={form.coupon_type}
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, coupon_type: e.target.value })
            }
          >
            <option value="DISCOUNT">DISCOUNT</option>
            <option value="GIFT">GIFT</option>
          </select>

          {/* Discount */}
          <input
            value={form.discount_value}
            type="number"
            placeholder="Discount Value"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, discount_value: e.target.value })
            }
          />

          {/* Max Discount */}
          <input
            value={form.max_discount}
            type="number"
            placeholder="Max Discount"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, max_discount: e.target.value })
            }
          />

          {/* Min Cart */}
          <input
            value={form.min_cart_amount}
            type="number"
            placeholder="Min Cart Amount"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, min_cart_amount: e.target.value })
            }
          />

          {/* Apply To */}
          <select
            value={form.apply_to}
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, apply_to: e.target.value })
            }
          >
            <option value="CART">CART</option>
            <option value="CATEGORY">CATEGORY</option>
          </select>

          {/* Category ID */}
          <input
            value={form.category_id}
            placeholder="Category ID (if CATEGORY)"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, category_id: e.target.value })
            }
          />

          {/* Valid From */}
          <input
            value={form.valid_from}
            type="date"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, valid_from: e.target.value })
            }
          />

          {/* Valid Till */}
          <input
            value={form.valid_till}
            type="date"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, valid_till: e.target.value })
            }
          />

          {/* Custom Text */}
          <input
            value={form.custom_text}
            placeholder="Custom Text"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, custom_text: e.target.value })
            }
          />

          {/* Active */}
          <select
            value={form.is_active}
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({
                ...form,
                is_active: e.target.value === "true",
              })
            }
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>

          {/* Submit */}
          <button className="bg-black text-white px-4 py-2 rounded w-full">
            Create Coupon
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}