'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader, Badge, TableCard, Pagination, Actions } from '@/components/ui'

const stats = [
  { label: 'Payment Refund',  value: 490,  icon: '💸' },
  { label: 'Order Cancel',    value: 241,  icon: '❌' },
  { label: 'Order Shipped',   value: 630,  icon: '📦' },
  { label: 'Order Delivering',value: 170,  icon: '🚚' },
  { label: 'Pending Review',  value: 210,  icon: '📋' },
  { label: 'Pending Payment', value: 608,  icon: '⏳' },
  { label: 'Delivered',       value: 200,  icon: '✅' },
  { label: 'In Progress',     value: 656,  icon: '🔄' },
]

const orders = [
  { id: '#583488/80', date: 'Apr 23, 2024', customer: 'Gail C. Anderson',    priority: 'Normal', total: '$1,230.00', payment: 'Unpaid', items: 4, delivery: '-',             status: 'Draft'      },
  { id: '#456754/80', date: 'Apr 20, 2024', customer: 'Jung S. Ayala',       priority: 'Normal', total: '$987.00',   payment: 'Paid',   items: 2, delivery: '-',             status: 'Packaging'  },
  { id: '#578246/80', date: 'Apr 19, 2024', customer: 'David A. Arnold',     priority: 'High',   total: '$1,478.00', payment: 'Paid',   items: 5, delivery: '#D-57837678',   status: 'Completed'  },
  { id: '#348930/80', date: 'Apr 04, 2024', customer: 'Cecile D. Gordon',    priority: 'Normal', total: '$720.00',   payment: 'Refund', items: 4, delivery: '-',             status: 'Canceled'   },
  { id: '#391367/80', date: 'Apr 02, 2024', customer: 'William Moreno',      priority: 'Normal', total: '$1,909.00', payment: 'Paid',   items: 6, delivery: '#D-89734235',   status: 'Completed'  },
  { id: '#930447/80', date: 'Mar 28, 2024', customer: 'Alphonse Roy',        priority: 'High',   total: '$879.00',   payment: 'Paid',   items: 4, delivery: '#D-35227268',   status: 'Completed'  },
  { id: '#462397/80', date: 'Mar 20, 2024', customer: 'Pierpont Marleau',    priority: 'High',   total: '$1,230.00', payment: 'Refund', items: 2, delivery: '-',             status: 'Canceled'   },
  { id: '#472356/80', date: 'Mar 12, 2024', customer: 'Madeleine Gervais',   priority: 'Normal', total: '$1,264.00', payment: 'Paid',   items: 3, delivery: '#D-74922656',   status: 'Completed'  },
  { id: '#448226/80', date: 'Mar 02, 2024', customer: 'Satordi Gaillou',     priority: 'High',   total: '$1,787.00', payment: 'Paid',   items: 4, delivery: '-',             status: 'Packaging'  },
]

const statusV  = { Completed: 'success', Canceled: 'danger', Packaging: 'warning', Draft: 'secondary', Processing: 'primary' }
const payV     = { Paid: 'success', Unpaid: 'secondary', Refund: 'warning' }
const priV     = { High: 'danger', Normal: 'secondary' }

export default function OrdersPage() {
  const [page, setPage] = useState(1)

  return (
    <DashboardLayout title="Orders">
      <PageHeader
        title="Orders List"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Orders' }]}
        action={<button className="btn btn-primary">+ Create Order</button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 6, fontWeight: 600 }}>{s.label}</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#1e293b' }}>{s.value}</p>
              </div>
              <div style={{ width: 44, height: 44, background: 'rgba(59,130,246,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <TableCard
        title="All Order List"
        action={
          <select style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}>
            <option>This Month</option><option>Last Month</option><option>All Time</option>
          </select>
        }
      >
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th><th>Created at</th><th>Customer</th><th>Priority</th>
              <th>Total</th><th>Payment</th><th>Items</th><th>Delivery No.</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td style={{ fontWeight: 700, color: '#1e293b' }}>{o.id}</td>
                <td style={{ fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}>{o.date}</td>
                <td><a href="#" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>{o.customer}</a></td>
                <td><Badge variant={priV[o.priority]}>{o.priority}</Badge></td>
                <td style={{ fontWeight: 700 }}>{o.total}</td>
                <td><Badge variant={payV[o.payment]}>{o.payment}</Badge></td>
                <td>{o.items}</td>
                <td style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{o.delivery}</td>
                <td><Badge variant={statusV[o.status]}>{o.status}</Badge></td>
                <td><Actions onView={() => {}} onEdit={() => {}} onDelete={() => {}} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination current={page} total={3} onChange={setPage} showing={orders.length} totalItems={1200} />
      </TableCard>
    </DashboardLayout>
  )
}

//======================backend connected===================//

// 'use client'
// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllOrdersThunk } from '@/app/redux/features/ordersSlice'

// import DashboardLayout from '@/components/layout/DashboardLayout'
// import { PageHeader, Badge, TableCard, Pagination, Actions } from '@/components/ui'

// const stats = [
//   { label: 'Payment Refund',  value: 490,  icon: '💸' },
//   { label: 'Order Cancel',    value: 241,  icon: '❌' },
//   { label: 'Order Shipped',   value: 630,  icon: '📦' },
//   { label: 'Order Delivering',value: 170,  icon: '🚚' },
//   { label: 'Pending Review',  value: 210,  icon: '📋' },
//   { label: 'Pending Payment', value: 608,  icon: '⏳' },
//   { label: 'Delivered',       value: 200,  icon: '✅' },
//   { label: 'In Progress',     value: 656,  icon: '🔄' },
// ]

// const statusV  = { Completed: 'success', Canceled: 'danger', Packaging: 'warning', Draft: 'secondary', Processing: 'primary' }
// const payV     = { Paid: 'success', Unpaid: 'secondary', Refund: 'warning' }
// const priV     = { High: 'danger', Normal: 'secondary' }

// export default function OrdersPage() {
//   const [page, setPage] = useState(1)

//   const dispatch = useDispatch()
//   const { orders, loading } = useSelector((state) => state.orders)

//   useEffect(() => {
//     dispatch(getAllOrdersThunk())
//   }, [dispatch])

//   return (
//     <DashboardLayout title="Orders">
//       <PageHeader
//         title="Orders List"
//         crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Orders' }]}
//         action={<button className="btn btn-primary">+ Create Order</button>}
//       />

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
//         {stats.map((s) => (
//           <div key={s.label} className="card" style={{ padding: 18 }}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <div>
//                 <p style={{ fontSize: 13, color: '#64748b', marginBottom: 6, fontWeight: 600 }}>{s.label}</p>
//                 <p style={{ fontSize: 24, fontWeight: 800, color: '#1e293b' }}>{s.value}</p>
//               </div>
//               <div style={{ width: 44, height: 44, background: 'rgba(59,130,246,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
//                 {s.icon}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <TableCard
//         title="All Order List"
//         action={
//           <select style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 12px', fontSize: 13, background: '#fff' }}>
//             <option>This Month</option><option>Last Month</option><option>All Time</option>
//           </select>
//         }
//       >

//         {/* ✅ Loading */}
//         {loading && <p>Loading...</p>}

//         <table className="table">
//           <thead>
//             <tr>
//               <th>Order ID</th><th>Created at</th><th>Customer</th><th>Priority</th>
//               <th>Total</th><th>Payment</th><th>Items</th><th>Delivery No.</th><th>Status</th><th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders?.length > 0 ? (
//               orders.map((o) => (
//                 <tr key={o._id}>
//                   <td style={{ fontWeight: 700 }}>{o._id}</td>

//                   <td style={{ fontSize: 13, color: '#64748b' }}>
//                     {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "-"}
//                   </td>

//                   <td>
//                     <span style={{ color: '#3b82f6', fontWeight: 600 }}>
//                       {o.user?.name || "User"}
//                     </span>
//                   </td>

//                   <td>
//                     <Badge variant={priV[o.priority || "Normal"]}>
//                       {o.priority || "Normal"}
//                     </Badge>
//                   </td>

//                   <td style={{ fontWeight: 700 }}>
//                     ₹{o.totalAmount || 0}
//                   </td>

//                   <td>
//                     <Badge variant={payV[o.paymentStatus || "Unpaid"]}>
//                       {o.paymentStatus || "Unpaid"}
//                     </Badge>
//                   </td>

//                   <td>{o.items?.length || 0}</td>

//                   <td style={{ fontSize: 12 }}>
//                     {o.deliveryId || "-"}
//                   </td>

//                   <td>
//                     <Badge variant={statusV[o.status || "Processing"]}>
//                       {o.status || "Processing"}
//                     </Badge>
//                   </td>

//                   <td>
//                     <Actions onView={() => {}} onEdit={() => {}} onDelete={() => {}} />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               !loading && (
//                 <tr>
//                   <td colSpan="10" style={{ textAlign: "center" }}>
//                     No Orders Found
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>

//         <Pagination
//           current={page}
//           total={3}
//           onChange={setPage}
//           showing={orders?.length || 0}
//           totalItems={orders?.length || 0}
//         />
//       </TableCard>
//     </DashboardLayout>
//   )
// }