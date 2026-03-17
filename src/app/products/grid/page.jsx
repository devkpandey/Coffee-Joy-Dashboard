'use client'
import { useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader, Badge } from '@/components/ui'

const products = [
  { id: 1,  name: 'Black T-Shirt',           price: '$80.00',  stock: 486, category: 'Fashion',     rating: 4.5, reviews: 55,  status: 'active' },
  { id: 2,  name: 'Olive Leather Bag',       price: '$149.99', stock: 120, category: 'Accessories', rating: 4.8, reviews: 42,  status: 'active' },
  { id: 3,  name: 'Running Shoes Pro',       price: '$120.00', stock: 340, category: 'Footwear',    rating: 4.3, reviews: 78,  status: 'active' },
  { id: 4,  name: 'Slim Fit Jeans',          price: '$65.00',  stock: 200, category: 'Fashion',     rating: 4.6, reviews: 94,  status: 'active' },
  { id: 5,  name: 'Wireless Headphones',     price: '$199.00', stock: 75,  category: 'Electronics', rating: 4.7, reviews: 125, status: 'active' },
  { id: 6,  name: 'Summer Floral Dress',     price: '$55.00',  stock: 0,   category: 'Fashion',     rating: 4.4, reviews: 38,  status: 'out' },
  { id: 7,  name: 'Leather Wallet',          price: '$45.00',  stock: 500, category: 'Accessories', rating: 4.2, reviews: 200, status: 'active' },
  { id: 8,  name: 'Sport Watch',             price: '$250.00', stock: 55,  category: 'Electronics', rating: 4.9, reviews: 67,  status: 'active' },
  { id: 9,  name: 'Canvas Sneakers',         price: '$75.00',  stock: 280, category: 'Footwear',    rating: 4.1, reviews: 110, status: 'active' },
  { id: 10, name: 'Denim Jacket',            price: '$110.00', stock: 95,  category: 'Fashion',     rating: 4.5, reviews: 60,  status: 'active' },
  { id: 11, name: 'Silk Scarf',              price: '$35.00',  stock: 0,   category: 'Accessories', rating: 4.0, reviews: 22,  status: 'out' },
  { id: 12, name: 'Smart Glasses',           price: '$320.00', stock: 18,  category: 'Electronics', rating: 4.8, reviews: 15,  status: 'active' },
]

const emojis = { Fashion: '👕', Accessories: '👜', Footwear: '👟', Electronics: '🎧' }

export default function ProductGridPage() {
  const [search, setSearch] = useState('')
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout title="Products">
      <PageHeader
        title="Products Grid"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Products' }, { label: 'Grid' }]}
        action={<Link href="/products/create" className="btn btn-primary">+ Add Product</Link>}
      />

      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '9px 14px', flex: 1, minWidth: 200, maxWidth: 340 }}>
          <span style={{ color: '#94a3b8' }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{ border: 'none', outline: 'none', fontSize: 14, width: '100%', fontFamily: 'inherit' }}
          />
        </div>
        <select style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '9px 14px', fontSize: 14, fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}>
          <option>All Categories</option><option>Fashion</option><option>Electronics</option><option>Accessories</option><option>Footwear</option>
        </select>
        <select style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '9px 14px', fontSize: 14, fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}>
          <option>Sort: Latest</option><option>Price: Low to High</option><option>Price: High to Low</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
        {filtered.map((p) => (
          <div key={p.id} className="card" style={{ overflow: 'hidden' }}>
            <div style={{ height: 160, background: 'linear-gradient(135deg,#f8fafc,#e2e8f0)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <span style={{ fontSize: 60 }}>{emojis[p.category] || '📦'}</span>
              {p.stock === 0 && (
                <span style={{ position: 'absolute', top: 10, left: 10, background: '#ef4444', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>Out of Stock</span>
              )}
              <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
                <button style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer' }}>👁</button>
                <button style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer' }}>✏️</button>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <Badge variant={p.status === 'active' ? 'success' : 'danger'}>{p.status === 'active' ? 'Active' : 'Out of Stock'}</Badge>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginTop: 8, marginBottom: 4 }}>{p.name}</h4>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>{p.category}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#3b82f6' }}>{p.price}</span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>Stock: {p.stock}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>⭐ {p.rating} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({p.reviews})</span></span>
                <button style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
