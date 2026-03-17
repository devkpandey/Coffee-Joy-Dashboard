'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { StatCard, Badge, TableCard, Pagination } from '@/components/ui'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { ShoppingCart, Award, Package, DollarSign } from 'lucide-react'

const perfData = [
  { m: 'Jan', rev: 4000, ord: 2400 }, { m: 'Feb', rev: 3000, ord: 1398 },
  { m: 'Mar', rev: 5200, ord: 3800 }, { m: 'Apr', rev: 2780, ord: 3908 },
  { m: 'May', rev: 4890, ord: 4800 }, { m: 'Jun', rev: 3390, ord: 3800 },
  { m: 'Jul', rev: 4490, ord: 4300 }, { m: 'Aug', rev: 5200, ord: 5100 },
  { m: 'Sep', rev: 6100, ord: 4600 }, { m: 'Oct', rev: 5700, ord: 5200 },
  { m: 'Nov', rev: 7200, ord: 5800 }, { m: 'Dec', rev: 8100, ord: 6400 },
]

const convData = [
  { name: 'Completed', value: 65, color: '#3b82f6' },
  { name: 'Processing', value: 20, color: '#06b6d4' },
  { name: 'Cancelled',  value: 15, color: '#e2e8f0' },
]

const topPages = [
  { path: '/ecommerce',  views: 465,  rate: '4.4%',  v: 'success' },
  { path: '/dashboard',  views: 426,  rate: '20.4%', v: 'danger' },
  { path: '/chat',       views: 254,  rate: '12.25%',v: 'warning' },
  { path: '/auth-login', views: 3369, rate: '5.2%',  v: 'success' },
  { path: '/email',      views: 985,  rate: '64.2%', v: 'danger' },
  { path: '/social',     views: 653,  rate: '2.4%',  v: 'success' },
  { path: '/blog',       views: 478,  rate: '1.4%',  v: 'danger' },
]

const recentOrders = [
  { id: '#RB5625', date: '29 Apr 2024', customer: 'Anna M. Hines',      email: 'anna.hines@mail.com',      phone: '(+1)-555-1564-261',   address: 'Burr Ridge/Illinois', payment: 'Credit Card', status: 'Completed' },
  { id: '#RB9652', date: '25 Apr 2024', customer: 'Judith H. Fritsche', email: 'judith.fritsche@mail.com', phone: '(+57)-305-5579-759',  address: 'SULLIVAN/Kentucky',   payment: 'Credit Card', status: 'Completed' },
  { id: '#RB5984', date: '25 Apr 2024', customer: 'Peter T. Smith',     email: 'peter.smith@mail.com',     phone: '(+33)-655-5187-93',   address: 'Yreka/California',    payment: 'PayPal',      status: 'Completed' },
  { id: '#RB3625', date: '21 Apr 2024', customer: 'Emmanuel J. Delcid', email: 'emmanuel@mail.com',        phone: '(+30)-693-5553-637',  address: 'Atlanta/Georgia',     payment: 'PayPal',      status: 'Processing' },
  { id: '#RB8652', date: '18 Apr 2024', customer: 'William J. Cook',    email: 'william.cook@mail.com',    phone: '(+91)-855-5446-150',  address: 'Rosenberg/Texas',     payment: 'Credit Card', status: 'Processing' },
]

const statusVariant = { Completed: 'success', Processing: 'primary', Cancelled: 'danger', Pending: 'warning' }

export default function DashboardPage() {
  const [perfPeriod, setPerfPeriod] = useState('1Y')
  const [page, setPage] = useState(1)

  return (
    <DashboardLayout title="Dashboard">
      {/* Alert */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 14 }}>
        ⚠️ We regret to inform you that our server is currently experiencing technical difficulties.
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
        <StatCard title="Total Orders"    value="13,647"  change="2.3%"  trend="up"   period="Last Week"  icon={<ShoppingCart size={22} color="#3b82f6" />} />
        <StatCard title="New Leads"       value="9,526"   change="8.1%"  trend="up"                       icon={<Award        size={22} color="#3b82f6" />} />
        <StatCard title="Deals"           value="976"     change="0.3%"  trend="down"                     icon={<Package      size={22} color="#3b82f6" />} />
        <StatCard title="Booked Revenue"  value="$123.6k" change="10.6%" trend="down"                     icon={<DollarSign   size={22} color="#3b82f6" />} />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20, marginBottom: 24 }}>
        {/* Performance */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h4 style={{ fontWeight: 700, color: '#1e293b' }}>Performance</h4>
            <div style={{ display: 'flex', gap: 4 }}>
              {['ALL', '1M', '6M', '1Y'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPerfPeriod(p)}
                  style={{
                    padding: '4px 10px', fontSize: 12, fontWeight: 600, borderRadius: 6,
                    border: '1px solid', cursor: 'pointer',
                    borderColor: p === perfPeriod ? '#3b82f6' : '#e2e8f0',
                    background: p === perfPeriod ? '#3b82f6' : 'transparent',
                    color: p === perfPeriod ? '#fff' : '#64748b',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={perfData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gr1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gr2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#06b6d4" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis                tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="rev" stroke="#3b82f6" strokeWidth={2} fill="url(#gr1)" name="Revenue" />
              <Area type="monotone" dataKey="ord" stroke="#06b6d4" strokeWidth={2} fill="url(#gr2)" name="Orders"  />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Conversions */}
        <div className="card" style={{ padding: 20 }}>
          <h5 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>Conversions</h5>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={convData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={3} dataKey="value">
                {convData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12, paddingTop: 16, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>This Week</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#1e293b' }}>23.5k</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Last Week</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#1e293b' }}>41.05k</p>
            </div>
          </div>
          <button className="btn btn-light" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}>
            View Details
          </button>
        </div>
      </div>

      {/* Sessions + Top Pages */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <h5 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 14 }}>Sessions by Country</h5>
          <div style={{ height: 200, background: 'linear-gradient(135deg,#eff6ff,#e0f2fe)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 40 }}>🗺️</span>
            <p style={{ fontSize: 13, color: '#64748b' }}>World Map Visualization</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16, paddingTop: 16, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <div><p style={{ fontSize: 12, color: '#94a3b8' }}>This Week</p><p style={{ fontSize: 22, fontWeight: 800 }}>23.5k</p></div>
            <div><p style={{ fontSize: 12, color: '#94a3b8' }}>Last Week</p><p style={{ fontSize: 22, fontWeight: 800 }}>41.05k</p></div>
          </div>
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
            <h5 style={{ fontWeight: 700, color: '#1e293b' }}>Top Pages</h5>
            <a href="#" style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>View All</a>
          </div>
          <table className="table">
            <thead><tr><th>Page Path</th><th>Views</th><th>Exit Rate</th></tr></thead>
            <tbody>
              {topPages.map((p) => (
                <tr key={p.path}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748b' }}>{p.path}</td>
                  <td style={{ fontWeight: 600 }}>{p.views}</td>
                  <td><Badge variant={p.v}>{p.rate}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <TableCard
        title="Recent Orders"
        action={<button className="btn btn-soft-primary" style={{ fontSize: 13 }}>+ Create Order</button>}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th><th>Date</th><th>Customer</th><th>Email</th>
              <th>Phone</th><th>Address</th><th>Payment</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td style={{ color: '#3b82f6', fontWeight: 700 }}>{o.id}</td>
                <td style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>{o.date}</td>
                <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{o.customer}</td>
                <td style={{ fontSize: 12 }}>{o.email}</td>
                <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{o.phone}</td>
                <td style={{ fontSize: 12 }}>{o.address}</td>
                <td style={{ fontSize: 12 }}>{o.payment}</td>
                <td><Badge variant={statusVariant[o.status]} dot>{o.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination current={page} total={3} onChange={setPage} showing={5} totalItems={90521} />
      </TableCard>
    </DashboardLayout>
  )
}
