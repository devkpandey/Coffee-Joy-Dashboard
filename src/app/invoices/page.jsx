'use client'
import { useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader, Badge, TableCard, Pagination, Actions } from '@/components/ui'

const stats = [
  { label: 'Total Invoice',    value: '2310', icon: '📋' },
  { label: 'Pending Invoice',  value: '1000', icon: '⏳' },
  { label: 'Paid Invoice',     value: '1310', icon: '✅' },
  { label: 'Inactive Invoice', value: '1243', icon: '🚫' },
]

const invoices = [
  { id: '#INV2540', name: 'Michael A. Miner',  date: '07 Jan, 2023', total: '$452', method: 'Mastercard', status: 'Completed' },
  { id: '#INV3924', name: 'Theresa T. Brose',  date: '03 Dec, 2023', total: '$783', method: 'Visa',       status: 'Cancel'    },
  { id: '#INV5032', name: 'James L. Erickson', date: '28 Sep, 2023', total: '$134', method: 'Paypal',     status: 'Completed' },
  { id: '#INV1695', name: 'Lily W. Wilson',    date: '10 Aug, 2023', total: '$945', method: 'Mastercard', status: 'Pending'   },
  { id: '#INV8473', name: 'Sarah M. Brooks',   date: '22 May, 2023', total: '$421', method: 'Visa',       status: 'Cancel'    },
  { id: '#INV2150', name: 'Joe K. Hall',       date: '15 Mar, 2023', total: '$251', method: 'Paypal',     status: 'Completed' },
  { id: '#INV5636', name: 'Ralph Hueber',      date: '15 Mar, 2023', total: '$310', method: 'Visa',       status: 'Completed' },
  { id: '#INV2940', name: 'Sarah Drescher',    date: '15 Mar, 2023', total: '$241', method: 'Mastercard', status: 'Completed' },
  { id: '#INV9027', name: 'Leonie Meister',    date: '15 Mar, 2023', total: '$136', method: 'Paypal',     status: 'Pending'   },
]

const statusV = { Completed: 'success', Cancel: 'danger', Pending: 'warning' }
const colors  = ['#3b82f6','#06b6d4','#8b5cf6','#f59e0b','#ef4444','#10b981','#f97316','#6366f1','#14b8a6']

export default function InvoicesPage() {
  const [page, setPage] = useState(1)

  return (
    <DashboardLayout title="Invoices">
      <PageHeader
        title="Invoices List"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Invoices' }]}
        action={<Link href="/invoices/create" className="btn btn-primary">+ Create Invoice</Link>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 6, fontWeight: 600 }}>{s.label}</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: '#1e293b' }}>{s.value}</p>
              </div>
              <div style={{ width: 48, height: 48, background: 'rgba(59,130,246,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <TableCard
        title="All Invoices List"
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
              <th>Invoice ID</th><th>Billing Name</th><th>Order Date</th>
              <th>Total</th><th>Payment Method</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={inv.id}>
                <td><input type="checkbox" /></td>
                <td><a href="#" style={{ color: '#1e293b', fontWeight: 700, textDecoration: 'none' }}>{inv.id}</a></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: colors[i % colors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                      {inv.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <span style={{ fontWeight: 600 }}>{inv.name}</span>
                  </div>
                </td>
                <td style={{ fontSize: 13, color: '#64748b' }}>{inv.date}</td>
                <td style={{ fontWeight: 700 }}>{inv.total}</td>
                <td style={{ fontSize: 13 }}>{inv.method}</td>
                <td><Badge variant={statusV[inv.status]}>{inv.status}</Badge></td>
                <td><Actions onView={() => {}} onEdit={() => {}} onDelete={() => {}} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination current={page} total={3} onChange={setPage} showing={invoices.length} totalItems={2310} />
      </TableCard>
    </DashboardLayout>
  )
}
