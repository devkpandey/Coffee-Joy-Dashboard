'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader, Badge, TableCard, Pagination, Actions } from '@/components/ui'

const categories = [
  { id: 1, name: 'Fashion',           products: 148, status: 'active',   created: '12 Jan 2024' },
  { id: 2, name: 'Electronics',       products: 95,  status: 'active',   created: '18 Jan 2024' },
  { id: 3, name: 'Accessories',       products: 212, status: 'active',   created: '22 Jan 2024' },
  { id: 4, name: 'Footwear',          products: 67,  status: 'active',   created: '05 Feb 2024' },
  { id: 5, name: 'Home & Living',     products: 183, status: 'inactive', created: '11 Feb 2024' },
  { id: 6, name: 'Sports & Outdoors', products: 54,  status: 'active',   created: '14 Feb 2024' },
  { id: 7, name: 'Beauty & Health',   products: 76,  status: 'active',   created: '20 Feb 2024' },
  { id: 8, name: 'Books & Stationery',products: 32,  status: 'inactive', created: '28 Feb 2024' },
]

export default function CategoriesPage() {
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newStatus, setNewStatus] = useState('active')

  return (
    <DashboardLayout title="Categories">
      <PageHeader
        title="Categories"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Category' }]}
        action={<button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Category</button>}
      />

      <TableCard title="All Categories">
        <table className="table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>#</th><th>Category Name</th><th>Products</th><th>Status</th><th>Created At</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td><input type="checkbox" /></td>
                <td style={{ color: '#94a3b8', fontWeight: 600 }}>{c.id}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
                      {c.name[0]}
                    </div>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{c.name}</span>
                  </div>
                </td>
                <td><span style={{ fontWeight: 600, color: '#3b82f6' }}>{c.products} Products</span></td>
                <td><Badge variant={c.status === 'active' ? 'success' : 'secondary'}>{c.status}</Badge></td>
                <td style={{ fontSize: 13, color: '#64748b' }}>{c.created}</td>
                <td><Actions onView={() => {}} onEdit={() => {}} onDelete={() => {}} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination current={page} total={2} onChange={setPage} showing={categories.length} totalItems={categories.length} />
      </TableCard>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div className="card" style={{ padding: 28, width: 420, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h4 style={{ fontWeight: 800, fontSize: 17, color: '#1e293b' }}>Add New Category</h4>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#94a3b8' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="form-label">Category Name</label>
                <input className="form-control" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Clothing" />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} placeholder="Brief description..." />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select className="form-control" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowModal(false)}>Create Category</button>
              <button className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
