'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader } from '@/components/ui'

const tabs = [
  { key: 'general',       label: '🏪 General'       },
  { key: 'account',       label: '👤 Account'       },
  { key: 'notifications', label: '🔔 Notifications' },
  { key: 'security',      label: '🔒 Security'      },
  { key: 'billing',       label: '💳 Billing'       },
]

const notifItems = [
  { label: 'Email Notifications',  desc: 'Receive notifications via email',              on: true  },
  { label: 'Order Updates',        desc: 'Get notified when orders are updated',          on: true  },
  { label: 'New Customer Signup',  desc: 'Alert when a new customer registers',           on: true  },
  { label: 'Low Stock Alerts',     desc: 'Notify when products are running low',          on: false },
  { label: 'Marketing Emails',     desc: 'Receive promotional and marketing emails',      on: false },
]

const plans = [
  { plan: 'Starter',    price: 'Free',    features: ['5 Products', '1 User', 'Basic Analytics'],                        active: false },
  { plan: 'Pro',        price: '$29/mo',  features: ['Unlimited Products', '5 Users', 'Advanced Analytics'],             active: true  },
  { plan: 'Enterprise', price: '$99/mo',  features: ['Unlimited Everything', 'Priority Support', 'Custom Integrations'], active: false },
]

export default function SettingsPage() {
  const [tab, setTab] = useState('general')
  const [storeName, setStoreName]   = useState('Larkon Store')
  const [email, setEmail]           = useState('admin@larkon.com')
  const [phone, setPhone]           = useState('+1 234 567 890')
  const [currency, setCurrency]     = useState('USD')
  const [language, setLanguage]     = useState('English')
  const [timezone, setTimezone]     = useState('UTC-5')

  return (
    <DashboardLayout title="Settings">
      <PageHeader
        title="Settings"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Settings' }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
        {/* Sidebar */}
        <div className="card" style={{ padding: 12, alignSelf: 'start' }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 8, border: 'none',
                background: tab === t.key ? '#eff6ff' : 'transparent',
                color: tab === t.key ? '#1d4ed8' : '#475569',
                fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 2,
                fontFamily: 'inherit', textAlign: 'left',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card" style={{ padding: 28 }}>
          {/* General */}
          {tab === 'general' && (
            <div>
              <h4 style={{ fontWeight: 800, fontSize: 17, color: '#1e293b', marginBottom: 24 }}>General Settings</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div><label className="form-label">Store Name</label><input className="form-control" value={storeName} onChange={(e) => setStoreName(e.target.value)} /></div>
                <div><label className="form-label">Contact Email</label><input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><label className="form-label">Phone Number</label><input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                <div>
                  <label className="form-label">Currency</label>
                  <select className="form-control" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option>USD</option><option>EUR</option><option>GBP</option><option>INR</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Language</label>
                  <select className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option>English</option><option>Spanish</option><option>French</option><option>German</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Timezone</label>
                  <select className="form-control" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                    <option>UTC-5</option><option>UTC+0</option><option>UTC+5:30</option><option>UTC+8</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <label className="form-label">Store Description</label>
                <textarea className="form-control" rows={3} placeholder="Brief description of your store..." />
              </div>
            </div>
          )}

          {/* Account */}
          {tab === 'account' && (
            <div>
              <h4 style={{ fontWeight: 800, fontSize: 17, color: '#1e293b', marginBottom: 24 }}>Account Settings</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#60a5fa,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 28 }}>G</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 16, color: '#1e293b' }}>Gaston Admin</p>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>admin@larkon.com</p>
                  <button className="btn btn-light" style={{ fontSize: 12, marginTop: 8 }}>Change Photo</button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div><label className="form-label">First Name</label><input className="form-control" defaultValue="Gaston" /></div>
                <div><label className="form-label">Last Name</label><input className="form-control" defaultValue="Admin" /></div>
                <div><label className="form-label">Email</label><input className="form-control" defaultValue="admin@larkon.com" /></div>
                <div><label className="form-label">Username</label><input className="form-control" defaultValue="gaston_admin" /></div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {tab === 'notifications' && (
            <div>
              <h4 style={{ fontWeight: 800, fontSize: 17, color: '#1e293b', marginBottom: 24 }}>Notification Preferences</h4>
              {notifItems.map((n) => (
                <div key={n.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f8fafc' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: '#1e293b' }}>{n.label}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>{n.desc}</p>
                  </div>
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: n.on ? '#3b82f6' : '#e2e8f0', cursor: 'pointer', position: 'relative' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: n.on ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Security */}
          {tab === 'security' && (
            <div>
              <h4 style={{ fontWeight: 800, fontSize: 17, color: '#1e293b', marginBottom: 24 }}>Security Settings</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="card" style={{ padding: 20, background: '#f8fafc' }}>
                  <h5 style={{ fontWeight: 700, marginBottom: 16 }}>Change Password</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div><label className="form-label">Current Password</label><input className="form-control" type="password" placeholder="••••••••" /></div>
                    <div><label className="form-label">New Password</label><input className="form-control" type="password" placeholder="••••••••" /></div>
                    <div><label className="form-label">Confirm New Password</label><input className="form-control" type="password" placeholder="••••••••" /></div>
                  </div>
                  <button className="btn btn-primary" style={{ marginTop: 14 }}>Update Password</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#f8fafc', borderRadius: 10 }}>
                  <div>
                    <p style={{ fontWeight: 700 }}>Two-Factor Authentication</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>Add an extra layer of security</p>
                  </div>
                  <button className="btn btn-soft-primary" style={{ fontSize: 13 }}>Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {/* Billing */}
          {tab === 'billing' && (
            <div>
              <h4 style={{ fontWeight: 800, fontSize: 17, color: '#1e293b', marginBottom: 24 }}>Billing &amp; Plans</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {plans.map((p) => (
                  <div key={p.plan} className="card" style={{ padding: 20, border: p.active ? '2px solid #3b82f6' : '1px solid #e2e8f0', position: 'relative' }}>
                    {p.active && (
                      <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#3b82f6', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 9999 }}>CURRENT</span>
                    )}
                    <h5 style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{p.plan}</h5>
                    <p style={{ fontSize: 24, fontWeight: 900, color: '#3b82f6', marginBottom: 12 }}>{p.price}</p>
                    <ul style={{ listStyle: 'none', fontSize: 13, color: '#64748b' }}>
                      {p.features.map((f) => <li key={f} style={{ marginBottom: 6 }}>✓ {f}</li>)}
                    </ul>
                    <button className={`btn ${p.active ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center', marginTop: 14, fontSize: 13 }}>
                      {p.active ? 'Current Plan' : 'Upgrade'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 10 }}>
            <button className="btn btn-primary">Save Changes</button>
            <button className="btn btn-light">Cancel</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
