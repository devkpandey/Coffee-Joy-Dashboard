'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, Bell, Moon, Sun, Settings, LogOut, User, MessageSquare, HelpCircle, Lock, X } from 'lucide-react'

const notifications = [
  { id: 1, init: 'JT', color: '#3b82f6', text: 'Josephine Thompson commented on admin panel', time: '2 min ago' },
  { id: 2, init: 'DS', color: '#06b6d4', text: 'Donoghue Susan: Hi, How are you? What about our meeting?', time: '15 min ago' },
  { id: 3, init: 'JG', color: '#8b5cf6', text: 'Jacob Gines answered your comment on cash flow forecast', time: '1 hr ago' },
  { id: 4, init: '💬', color: '#f59e0b', text: 'You have received 20 new messages in the conversation', time: '3 hrs ago' },
]

export default function Topbar({ onToggle, dark, setDark, title }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  return (
    <header className="topbar">
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 6, borderRadius: 8, display: 'flex' }}
        >
          <Menu size={20} />
        </button>
        <h1 style={{ fontWeight: 800, fontSize: 14, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title || 'Dashboard'}
        </h1>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Search */}
        <div className="search-bar">
          <Search size={14} color="#94a3b8" />
          <input placeholder="Search..." />
        </div>

        {/* Dark mode */}
        <button
          onClick={() => setDark(!dark)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 8, borderRadius: 8, display: 'flex' }}
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="dropdown">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 8, borderRadius: 8, display: 'flex', position: 'relative' }}
          >
            <Bell size={20} />
            <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }} />
          </button>
          {notifOpen && (
            <div className="dropdown-menu" style={{ width: 340 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>Notifications</span>
                <button onClick={() => setNotifOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                  <X size={14} />
                </button>
              </div>
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: '1px solid #f8fafc', cursor: 'pointer' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                      {n.init}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{n.text}</p>
                      <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px 16px', textAlign: 'center' }}>
                <a href="#" style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>View All Notifications →</a>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 8, borderRadius: 8, display: 'flex' }}>
          <Settings size={20} />
        </button>

        {/* User */}
        <div className="dropdown">
          <button
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 8, display: 'flex' }}
          >
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#60a5fa,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
              G
            </div>
          </button>
          {userOpen && (
            <div className="dropdown-menu">
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Welcome, Gaston!</p>
                <p style={{ fontSize: 12, color: '#94a3b8' }}>admin@larkon.com</p>
              </div>
              <Link href="/profile" className="dropdown-item"><User size={15} />Profile</Link>
              <Link href="/apps/chat" className="dropdown-item"><MessageSquare size={15} />Messages</Link>
              <Link href="/support/faqs" className="dropdown-item"><HelpCircle size={15} />Help</Link>
              <Link href="/login" className="dropdown-item"><Lock size={15} />Lock Screen</Link>
              <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />
              <Link href="/login" className="dropdown-item" style={{ color: '#ef4444' }}><LogOut size={15} />Logout</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
