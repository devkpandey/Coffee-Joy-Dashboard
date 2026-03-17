// Badge
export function Badge({ children, variant = 'secondary', dot }) {
  return (
    <span className={`badge badge-${variant}`}>
      {dot && (
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
      )}
      {children}
    </span>
  )
}

// StatCard
export function StatCard({ title, value, icon, trend, change, period = 'Last Month' }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div className="stat-icon">{icon}</div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{title}</p>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b' }}>{value}</h3>
        </div>
      </div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: trend === 'up' ? '#16a34a' : '#dc2626' }}>
              {trend === 'up' ? '↑' : '↓'} {change}
            </span>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{period}</span>
          </div>
          <a href="#" style={{ fontSize: 12, fontWeight: 600, color: '#475569', textDecoration: 'none' }}>View More</a>
        </div>
      )}
    </div>
  )
}

// PageHeader
export function PageHeader({ title, action, crumbs }) {
  return (
    <div className="page-header">
      <div>
        <h2 className="page-title">{title}</h2>
        {crumbs && (
          <nav className="breadcrumb">
            {crumbs.map((c, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i > 0 && <span>/</span>}
                <span style={{ color: c.href ? '#3b82f6' : '#94a3b8' }}>{c.label}</span>
              </span>
            ))}
          </nav>
        )}
      </div>
      {action}
    </div>
  )
}

// Actions
export function Actions({ onView, onEdit, onDelete }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {onView  && <button onClick={onView}   className="btn btn-light"        style={{ padding: '5px 8px' }}>👁</button>}
      {onEdit  && <button onClick={onEdit}   className="btn btn-soft-primary" style={{ padding: '5px 8px' }}>✏️</button>}
      {onDelete && <button onClick={onDelete} className="btn btn-soft-danger"  style={{ padding: '5px 8px' }}>🗑</button>}
    </div>
  )
}

// Pagination
export function Pagination({ current, total, onChange, showing, totalItems }) {
  const pages = Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderTop: '1px solid #f1f5f9' }}>
      {totalItems != null && showing != null ? (
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Showing <b>{showing}</b> of <b>{totalItems.toLocaleString()}</b>
        </p>
      ) : <div />}
      <div className="pagination">
        <button className="page-btn" onClick={() => onChange(Math.max(1, current - 1))}>‹</button>
        {pages.map((p) => (
          <button
            key={p}
            className={`page-btn${p === current ? ' active' : ''}`}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}
        <button className="page-btn" onClick={() => onChange(Math.min(total, current + 1))}>›</button>
      </div>
    </div>
  )
}

// TableCard
export function TableCard({ title, action, children }) {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
        <h4 style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>{title}</h4>
        {action}
      </div>
      <div style={{ overflowX: 'auto' }}>{children}</div>
    </div>
  )
}
