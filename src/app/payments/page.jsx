"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPayments,
  refundPaymentThunk,
} from "@/app/redux/features/paymentSlice";
import axios from "axios";

export default function PaymentsTable() {
  const dispatch = useDispatch();

  const { payments, loading, refundLoading } = useSelector(
    (state) => state.payments
  );

  const [orderUserMap, setOrderUserMap] = useState({});

  // ✅ Fetch payments
  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  // ✅ Fetch orders and map user names
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://coffeewebapi.barecms.com/api/orders/get-all-orders"
        );

        console.log("ORDERS API:", res.data);

        // 🔥 IMPORTANT FIX (handle both structures)
        const ordersArray = res.data.data || res.data;

        const map = {};

        ordersArray.forEach((order) => {
          const key = String(order.order_id).trim(); // ensure string match
          const name = order.name?.trim() || "Unknown";

          map[key] = name;
        });

        console.log("MAP:", map);

        setOrderUserMap(map);
      } catch (err) {
        console.error("Order fetch error", err);
      }
    };

    fetchOrders();
  }, []);

  const handleRefund = (id) => {
    if (!confirm("Are you sure you want to refund?")) return;
    dispatch(refundPaymentThunk(id));
  };

  return (
    <DashboardLayout title="Payments">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Payments</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="p-3">Payment ID</th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{p.id}</td>
                    <td className="p-3">{p.order_id}</td>

                    {/* ✅ USER NAME FIX */}
                    <td className="p-3 font-medium">
                      {orderUserMap[String(p.order_id)] || "Loading..."}
                    </td>

                    <td className="p-3">₹{p.amount}</td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.status === "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : p.status === "REFUNDED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>

                    {/* ACTION */}
                    <td className="p-3">
                      {p.status === "SUCCESS" && (
                        <button
                          onClick={() => handleRefund(p.id)}
                          disabled={refundLoading}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs disabled:opacity-50"
                        >
                          {refundLoading ? "Processing..." : "Refund"}
                        </button>
                      )}

                      {p.status === "REFUNDED" && (
                        <span className="text-gray-400 text-xs">
                          Refunded
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {payments.length === 0 && (
              <p className="text-center py-6 text-gray-500">
                No payments found
              </p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}