"use client";

import DashboardLayout from '@/components/layout/DashboardLayout'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlansThunk,
  deletePlanThunk,
  updatePlanThunk,
} from "@/app/redux/features/subscriptionSlice";

import { Pencil, Trash2 } from "lucide-react";

export default function PlansPage() {
  const dispatch = useDispatch();
  const { plans, loading } = useSelector((state) => state.subscription);

  const [editPlan, setEditPlan] = useState(null);

  useEffect(() => {
    dispatch(getPlansThunk());
  }, []);

  const handleDelete = (id) => {
    if (confirm("Delete this plan?")) {
      dispatch(deletePlanThunk(id));
    }
  };

  const handleUpdate = () => {
    dispatch(updatePlanThunk({
      id: editPlan.id,
      data: editPlan,
    }));
    setEditPlan(null);
  };

  return (
    <DashboardLayout title="Subscription Plans">

      <div className="p-6">

        {/* HEADER */}
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">
            Subscription Plans
          </h2>
          <p className="text-sm text-gray-500">
            Manage your subscription plans here
          </p>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow border overflow-hidden">

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading plans...
            </div>
          ) : (

            <table className="w-full text-sm">

              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="text-left">Category</th>
                  <th>Deliveries</th>
                  <th>Discount</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {plans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {plan.name}
                    </td>

                    <td className="text-gray-600">
                      {plan.category_level_1}
                    </td>

                    <td className="text-center">
                      {plan.deliveries_count}
                    </td>

                    <td className="text-center text-green-600 font-medium">
                      {plan.discount_percent}%
                    </td>

                    {/* ACTIONS */}
                    <td className="text-center">
                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => setEditPlan(plan)}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(plan.id)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>

        {/* MODAL */}
        {editPlan && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4 animate-fadeIn">

              <h3 className="text-lg font-semibold text-gray-800">
                Edit Plan
              </h3>

              {/* INPUTS */}
              <div className="space-y-3">

                <input
                  value={editPlan.name}
                  onChange={(e) =>
                    setEditPlan({ ...editPlan, name: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Plan Name"
                />

                <input
                  type="number"
                  value={editPlan.deliveries_count}
                  onChange={(e) =>
                    setEditPlan({
                      ...editPlan,
                      deliveries_count: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Deliveries"
                />

                <input
                  type="number"
                  value={editPlan.discount_percent}
                  onChange={(e) =>
                    setEditPlan({
                      ...editPlan,
                      discount_percent: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Discount %"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  onClick={() => setEditPlan(null)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-lg btn btn-primary text-white  transition"
                >
                  Save Changes
                </button>

              </div>

            </div>
          </div>
        )}

      </div>

    </DashboardLayout>
  );
}