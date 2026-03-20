"use client";

import DashboardLayout from '@/components/layout/DashboardLayout'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionsThunk } from "@/app/redux/features/subscriptionSlice";

export default function SubscriptionsPage() {
  const dispatch = useDispatch();
  const { subscriptions, loading } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(getSubscriptionsThunk());
  }, []);

  return (
    <DashboardLayout title="Subscribed Users">

      <div className="p-6">

        {/* HEADER */}
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">
            Subscribed Users
          </h2>
          <p className="text-sm text-gray-500">
            Manage all subscription users and deliveries
          </p>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow border">

  {loading ? (
    <div className="p-8 text-center text-gray-500 text-base">
      Loading subscriptions...
    </div>
  ) : (

    <div>

      {/* HEADER */}
      <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1.5fr_1.5fr_1fr] px-8 py-5 text-sm font-semibold text-gray-600 border-b bg-gray-50">
        <div>User</div>
        <div>Product</div>
        <div className="text-center">Type</div>
        <div className="text-center">Payment</div>
        <div className="text-center">Delivery</div>
        <div className="text-center">Next Delivery</div>
        <div className="text-center">Start Date</div>
        <div className="text-center">Status</div>
      </div>

      {/* ROWS */}
      {subscriptions.map((sub) => (
        <div
          key={sub.id}
          className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1.5fr_1.5fr_1fr] items-center px-8 py-5 border-b hover:bg-gray-50 transition"
        >

          {/* USER */}
          <div>
            <div className="font-semibold text-gray-800 text-[15px]">
              {sub.user_name || "N/A"}
            </div>
            {/* <div className="text-sm text-gray-500 mt-1">
              {sub.email}
            </div> */}
          </div>

          {/* PRODUCT */}
          <div className="relative group max-w-[150px]">

  {/* TEXT */}
  <div className="font-semibold text-gray-800 text-[15px] truncate">
    {sub.product_name}
  </div>

  {/* TOOLTIP */}
  <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
    {sub.product_name}
  </div>

</div>



          {/* TYPE */}
          <div className="text-center">
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
              {sub.frequency}
            </span>
          </div>

          {/* PAYMENT */}
          <div className="text-center">
            <span className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-full">
              {sub.payment_type}
            </span>
          </div>

          {/* DELIVERY */}
          <div className="text-center">
            <span className="font-semibold text-gray-800 text-[15px]">
              {sub.remaining_deliveries}
            </span>
            <span className="text-sm text-gray-500 ml-1">left</span>
          </div>

          {/* NEXT DELIVERY */}
          <div className="text-center text-gray-600 text-[14px]">
            {new Date(sub.next_delivery_date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>

          {/* START DATE */}
          <div className="text-center text-gray-600 text-[14px]">
            {new Date(sub.created_at).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>

          {/* STATUS */}
          <div className="text-center">
            <span
              className={`px-3 py-1 text-sm rounded-full font-medium ${
                sub.status === "ACTIVE"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {sub.status}
            </span>
          </div>

        </div>
      ))}

    </div>
  )}
</div>

      </div>

    </DashboardLayout>
  );
}