"use client";

import DashboardLayout from '@/components/layout/DashboardLayout'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlanThunk, getPlansThunk } from "@/app/redux/features/subscriptionSlice";

export default function CreatePlanPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.subscription);

  const [form, setForm] = useState({
    name: "",
    display_label: "",
    category_level_1: "",
    deliveries_count: "",
    discount_percent: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPlanThunk(form)).then(() => {
      dispatch(getPlansThunk());
      alert("Plan Created ✅");
      setForm({
        name: "",
        display_label: "",
        category_level_1: "",
        deliveries_count: "",
        discount_percent: "",
      });
    });
  };

  return (
    <DashboardLayout title="Create Subscription Plan">

      <div className="flex justify-center items-start py-10 px-4">
        
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border p-8">
          
          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create Subscription Plan
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill the details to create a new subscription plan
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* PLAN NAME */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Plan Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter plan name"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                required
              />
            </div>

            {/* DISPLAY LABEL */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Display Label</label>
              <input
                name="display_label"
                value={form.display_label}
                onChange={handleChange}
                placeholder="Optional label"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {/* CATEGORY */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Category *</label>
              <input
                name="category_level_1"
                value={form.category_level_1}
                onChange={handleChange}
                placeholder="e.g Coffee / Pods"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                required
              />
            </div>

            {/* DELIVERIES */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Deliveries Count *</label>
              <input
                name="deliveries_count"
                type="number"
                value={form.deliveries_count}
                onChange={handleChange}
                placeholder="e.g 4"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                required
              />
            </div>

            {/* DISCOUNT */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm text-gray-600 mb-1">Discount (%)</label>
              <input
                name="discount_percent"
                type="number"
                value={form.discount_percent}
                onChange={handleChange}
                placeholder="e.g 10"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="w-80  text-white btn btn-primary"
                style={{ justifyContent: 'center', padding: 13, fontSize: 15 }}
                disabled={loading}
              >
                {loading ? "Creating Plan..." : "Create Plan"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}