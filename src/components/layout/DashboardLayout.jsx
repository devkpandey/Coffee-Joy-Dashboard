'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false)
  const [dark, setDark] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4f8' }}>
      <Sidebar collapsed={collapsed} />
      <div
        style={{
          flex: 1,
          marginLeft: collapsed ? 72 : 260,
          transition: 'margin-left 0.25s',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Topbar
          onToggle={() => setCollapsed(!collapsed)}
          dark={dark}
          setDark={setDark}
          title={title}
        />
        <main style={{ flex: 1, padding: 24 }}>{children}</main>
        <footer
          style={{
            textAlign: 'center',
            padding: '14px',
            fontSize: 12,
            color: '#94a3b8',
            borderTop: '1px solid #e2e8f0',
            background: '#fff',
          }}
        >
          © 2024 Larkon. Designed &amp; Developed by{' '}
          <a href="#" style={{ color: '#3b82f6' }}>Larkon Team</a>
        </footer>
      </div>
    </div>
  )
}
