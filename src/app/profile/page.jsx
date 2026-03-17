'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader, Badge } from '@/components/ui'

const recentOrders = [
  { id: '#RB5625', product: 'Black T-Shirt',  date: '29 Apr 2024', total: '$80.00',  status: 'Completed'  },
  { id: '#RB9652', product: 'Leather Bag',    date: '25 Apr 2024', total: '$149.99', status: 'Processing' },
  { id: '#RB5984', product: 'Running Shoes',  date: '25 Apr 2024', total: '$120.00', status: 'Completed'  },
  { id: '#RB3625', product: 'Smart Watch',    date: '21 Apr 2024', total: '$250.00', status: 'Pending'    },
]

const activity = [
  { icon: '📦', text: 'Created new order #RB5625',             time: '2 min ago'  },
  { icon: '✏️', text: 'Updated product "Black T-Shirt"',       time: '1 hr ago'   },
  { icon: '👤', text: 'Added new customer Anna Hines',          time: '3 hrs ago'  },
  { icon: '💳', text: 'Processed invoice #INV2540',             time: '5 hrs ago'  },
  { icon: '⚙️', text: 'Updated store settings',                 time: 'Yesterday'  },
]

const statusV = { Completed: 'success', Processing: 'primary', Pending: 'warning', Cancelled: 'danger' }

export default function ProfilePage() {
  const [tab, setTab] = useState('overview')

  return (
    <DashboardLayout title="Profile">
      <PageHeader
        title="Profile"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Profile' }]}
      />

      {/* Header card */}
      <div className="card" style={{ marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ height: 140, background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 60%, #06b6d4 100%)' }} />
        <div style={{ padding: '0 28px 28px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: -40, flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
              <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg,#60a5fa,#3b82f6)', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 34 }}>G</div>
              <div style={{ marginBottom: 8 }}>
                <h3 style={{ fontWeight: 800, fontSize: 20, color: '#1e293b' }}>Gaston Admin</h3>
                <p style={{ fontSize: 14, color: '#64748b' }}>Administrator · New York, USA</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <button className="btn btn-soft-primary">✉️ Message</button>
              <button className="btn btn-primary">✏️ Edit Profile</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 24, paddingTop: 24, borderTop: '1px solid #f1f5f9' }}>
            {[['📦','1,205','Total Orders'],['💰','$84.2k','Revenue'],['👥','340','Customers'],['⭐','4.8','Avg Rating']].map(([icon, value, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <p style={{ fontWeight: 800, fontSize: 22, color: '#1e293b' }}>{value}</p>
                <p style={{ fontSize: 13, color: '#94a3b8' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '2px solid #f1f5f9' }}>
        {['overview', 'orders', 'settings'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 18px', fontSize: 14, fontWeight: 600, border: 'none',
              background: 'none', cursor: 'pointer', textTransform: 'capitalize',
              fontFamily: 'inherit', marginBottom: -2,
              color: tab === t ? '#3b82f6' : '#64748b',
              borderBottom: `2px solid ${tab === t ? '#3b82f6' : 'transparent'}`,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>Personal Information</h4>
            {[['Full Name','Gaston Admin'],['Email','admin@larkon.com'],['Phone','+1 (234) 567-890'],['Location','New York, USA'],['Member Since','January 2023'],['Role','Administrator']].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{value}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>Recent Activity</h4>
            {activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{a.text}</p>
                  <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
            <h4 style={{ fontWeight: 700, fontSize: 15 }}>Recent Orders</h4>
          </div>
          <table className="table">
            <thead><tr><th>Order ID</th><th>Product</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 700, color: '#3b82f6' }}>{o.id}</td>
                  <td style={{ fontWeight: 600 }}>{o.product}</td>
                  <td style={{ fontSize: 13, color: '#64748b' }}>{o.date}</td>
                  <td style={{ fontWeight: 700 }}>{o.total}</td>
                  <td><Badge variant={statusV[o.status]} dot>{o.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'settings' && (
        <div className="card" style={{ padding: 24 }}>
          <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Account Settings</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label className="form-label">First Name</label><input className="form-control" defaultValue="Gaston" /></div>
            <div><label className="form-label">Last Name</label><input className="form-control" defaultValue="Admin" /></div>
            <div><label className="form-label">Email</label><input className="form-control" defaultValue="admin@larkon.com" /></div>
            <div><label className="form-label">Phone</label><input className="form-control" defaultValue="+1 234 567 890" /></div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label className="form-label">Bio</label>
            <textarea className="form-control" rows={3} defaultValue="Administrator of Larkon ecommerce platform." />
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }}>Save Changes</button>
        </div>
      )}
    </DashboardLayout>
  )
}
