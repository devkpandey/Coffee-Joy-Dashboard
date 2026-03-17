'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader, Badge, TableCard, Pagination, Actions } from '@/components/ui'

const stats = [
  { label: 'All Customers',     value: '+22.63k',   change: '+34.4%', up: true,  icon: '👥' },
  { label: 'Orders',            value: '+4.5k',     change: '-8.1%',  up: false, icon: '📦' },
  { label: 'Service Requests',  value: '+1.03k',    change: '+12.6%', up: true,  icon: '🎧' },
  { label: 'Invoice & Payment', value: '$38,908',   change: '+45.9%', up: true,  icon: '📄' },
]

const customers = [
  { id: 1, name: 'Michael A. Miner',  invoice: '#INV2540', status: 'Completed', total: '$4,521', due: '$8,901', dueDate: '07 Jan, 2023', method: 'Mastercard' },
  { id: 2, name: 'Theresa T. Brose',  invoice: '#INV3924', status: 'Cancel',    total: '$7,836', due: '$9,902', dueDate: '03 Dec, 2023', method: 'Visa'       },
  { id: 3, name: 'James L. Erickson', invoice: '#INV5032', status: 'Completed', total: '$1,347', due: '$6,718', dueDate: '28 Sep, 2023', method: 'Paypal'     },
  { id: 4, name: 'Lily W. Wilson',    invoice: '#INV1695', status: 'Pending',   total: '$9,457', due: '$3,928', dueDate: '10 Aug, 2023', method: 'Mastercard' },
  { id: 5, name: 'Sarah M. Brooks',   invoice: '#INV8473', status: 'Cancel',    total: '$4,214', due: '$9,814', dueDate: '22 May, 2023', method: 'Visa'       },
  { id: 6, name: 'Joe K. Hall',       invoice: '#INV2150', status: 'Completed', total: '$2,513', due: '$5,891', dueDate: '15 Mar, 2023', method: 'Paypal'     },
  { id: 7, name: 'Ralph Hueber',      invoice: '#INV5636', status: 'Completed', total: '$3,103', due: '$8,415', dueDate: '15 Mar, 2023', method: 'Visa'       },
  { id: 8, name: 'Sarah Drescher',    invoice: '#INV2940', status: 'Completed', total: '$2,416', due: '$7,715', dueDate: '15 Mar, 2023', method: 'Mastercard' },
  { id: 9, name: 'Leonie Meister',    invoice: '#INV9027', status: 'Pending',   total: '$1,367', due: '$3,651', dueDate: '15 Mar, 2023', method: 'Paypal'     },
]

const statusV = { Completed: 'success', Cancel: 'danger', Pending: 'warning' }
const colors  = ['#3b82f6','#06b6d4','#8b5cf6','#f59e0b','#ef4444','#10b981','#f97316','#6366f1','#14b8a6']

export default function CustomersPage() {
  const [page, setPage] = useState(1)

  return (
    <DashboardLayout title="Customers">
      <PageHeader
        title="All Customers"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Customers' }]}
        action={<button className="btn btn-primary">+ Add Customer</button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, background: 'rgba(59,130,246,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.icon}</div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{s.label}</h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#64748b' }}>{s.value}</p>
              <Badge variant={s.up ? 'success' : 'danger'}>{s.up ? '↑' : '↓'} {s.change}</Badge>
            </div>
          </div>
        ))}
      </div>

      <TableCard
        title="All Customers List"
        action={
          <select style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}>
            <option>This Month</option><option>Last Month</option>
          </select>
        }
      >
        <table className="table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Customer Name</th><th>Invoice ID</th><th>Status</th>
              <th>Total Amount</th><th>Amount Due</th><th>Due Date</th><th>Payment Method</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={c.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: colors[i % colors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>{c.name}</span>
                  </div>
                </td>
                <td><a href="#" style={{ color: '#1e293b', textDecoration: 'none', fontWeight: 600 }}>{c.invoice}</a></td>
                <td><Badge variant={statusV[c.status]}>{c.status}</Badge></td>
                <td style={{ fontWeight: 600 }}>{c.total}</td>
                <td style={{ fontWeight: 600 }}>{c.due}</td>
                <td style={{ fontSize: 13, color: '#64748b' }}>{c.dueDate}</td>
                <td style={{ fontSize: 13 }}>{c.method}</td>
                <td><Actions onView={() => {}} onEdit={() => {}} onDelete={() => {}} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination current={page} total={3} onChange={setPage} showing={customers.length} totalItems={22630} />
      </TableCard>
    </DashboardLayout>
  )
}
