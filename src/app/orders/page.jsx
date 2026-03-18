
'use client'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersThunk } from '@/app/redux/features/ordersSlice'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader, Badge, TableCard, Pagination, Actions } from '@/components/ui'


export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("ALL");

  const dispatch = useDispatch()
  const { orders, loading } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(getAllOrdersThunk())
  }, [dispatch])


const filteredOrders = orders.filter((o) => {
  if (!o.created_at) return false;

  const orderDate = new Date(o.created_at);
  const now = new Date();

  if (filter === "THIS_MONTH") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return orderDate >= start && orderDate < end;
  }

  if (filter === "LAST_MONTH") {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 1);
    return orderDate >= start && orderDate < end;
  }

  return true;
});


const ITEMS_PER_PAGE = 10;

const paginatedOrders = filteredOrders.slice(
  (page - 1) * ITEMS_PER_PAGE,
  page * ITEMS_PER_PAGE
);

  return (
    <DashboardLayout title="Orders">
      <PageHeader
        title="Orders List"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Orders' }]}
        action={<button className="btn btn-primary">+ Create Order</button>}
      />

      <TableCard
        title="All Order List"
        action={
          <select value={filter} onChange={(e) => {
  setFilter(e.target.value);
  setPage(1); // ✅ reset page
}}
          style={{
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          padding: '6px 12px',
          fontSize: 13,
          background: '#fff'
          }}
          >
           <option value="ALL">All Time</option>
           <option value="THIS_MONTH">This Month</option>
           <option value="LAST_MONTH">Last Month</option>
         </select>
        }
      >

        {/* ✅ Loading */}
        {loading && <p>Loading...</p>}

        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders?.length > 0 ? (
             paginatedOrders.map((o) => {
             const images = o.product_image ? JSON.parse(o.product_image) : [];

          return (
          <tr key={o.order_id}>
          <td>{o.order_id}</td>

          <td>
            {o.created_at
            ? new Date(o.created_at).toLocaleDateString()
            : "-"}
          </td>

          <td>{o.name}</td>

          <td>{o.email}</td>

      {/* PRODUCT */}
      <td className="flex items-center gap-2">
        {images.length > 0 && (
          <img
            src={images[0]}
            alt={o.product_name}
            className="w-10 h-10 rounded-md object-cover"
          />
        )}
        <span>{o.product_name}</span>
      </td>

      <td>{o.quantity}</td>

      <td>₹{o.price}</td>

      <td>₹{o.total_amount}</td>

      <td>
        <span
          className={`px-2 py-1 rounded text-xs ${
            o.status === "PAID"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {o.status}
        </span>
      </td>
    </tr>
  );
})
            ) : (
              !loading && (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    No Orders Found
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <Pagination
          current={page}
          total={Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)}
          onChange={setPage}
          showing={paginatedOrders.length}
          totalItems={filteredOrders.length}
        />
      </TableCard>
    </DashboardLayout>
  )
}