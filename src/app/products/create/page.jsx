'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader } from '@/components/ui'

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function CreateProductPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [stock, setStock] = useState('')
  const [sku, setSku] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('active')
  const [sizes, setSizes] = useState([])

  function toggleSize(s) {
    setSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }

  return (
    <DashboardLayout title="Products">
      <PageHeader
        title="Create Product"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Products' }, { label: 'Create' }]}
        action={<a href="/products/list" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none', fontWeight: 600 }}>← Back to List</a>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 20, fontSize: 15 }}>General Information</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="form-label">Product Name</label>
                <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select category</option>
                    <option>Fashion</option><option>Electronics</option><option>Accessories</option><option>Footwear</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Brand</label>
                  <input className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand name" />
                </div>
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product description..." rows={4} style={{ resize: 'vertical' }} />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 20, fontSize: 15 }}>Pricing &amp; Stock</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label className="form-label">Regular Price</label>
                <input className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="$0.00" />
              </div>
              <div>
                <label className="form-label">Sale Price</label>
                <input className="form-control" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="$0.00" />
              </div>
              <div>
                <label className="form-label">Stock Quantity</label>
                <input className="form-control" type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="form-label">SKU</label>
                <input className="form-control" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU-001" />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 20, fontSize: 15 }}>Available Sizes</h4>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  style={{
                    padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.15s',
                    border: `2px solid ${sizes.includes(s) ? '#3b82f6' : '#e2e8f0'}`,
                    background: sizes.includes(s) ? '#dbeafe' : '#fff',
                    color: sizes.includes(s) ? '#1d4ed8' : '#64748b',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 16, fontSize: 15 }}>Product Status</h4>
            {['active', 'draft', 'inactive'].map((s) => (
              <label
                key={s}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                  padding: '10px 12px', borderRadius: 8, marginBottom: 6,
                  background: status === s ? '#eff6ff' : '#f8fafc',
                  border: `1px solid ${status === s ? '#bfdbfe' : '#e2e8f0'}`,
                }}
              >
                <input type="radio" name="status" checked={status === s} onChange={() => setStatus(s)} style={{ accentColor: '#3b82f6' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151', textTransform: 'capitalize' }}>{s}</span>
              </label>
            ))}
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 16, fontSize: 15 }}>Product Images</h4>
            <div
              style={{ border: '2px dashed #e2e8f0', borderRadius: 10, padding: 30, textAlign: 'center', cursor: 'pointer' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>📷</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Drop files here or click to upload</p>
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>PNG, JPG up to 10MB</p>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 16, fontSize: 15 }}>Tags</h4>
            <input className="form-control" placeholder="Add tags separated by comma..." />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-primary" style={{ justifyContent: 'center', padding: 13, fontSize: 15 }}>✓ Create Product</button>
            <button className="btn btn-light" style={{ justifyContent: 'center', padding: 13, fontSize: 15 }}>Save as Draft</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
