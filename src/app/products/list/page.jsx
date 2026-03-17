'use client'
import { useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader, Badge, TableCard, Pagination, Actions } from '@/components/ui'

const products = [
  { id: 1,  name: 'Black T-Shirt',            sizes: 'S, M, L, XL',    price: '$80.00',   stock: 486, sold: 155, category: 'Fashion',     rating: 4.5, reviews: 55  },
  { id: 2,  name: 'Olive Green Leather Bag',  sizes: 'S, M',           price: '$149.99',  stock: 120, sold: 89,  category: 'Accessories', rating: 4.8, reviews: 42  },
  { id: 3,  name: 'Running Shoes Pro',        sizes: '7, 8, 9, 10, 11',price: '$120.00',  stock: 340, sold: 210, category: 'Footwear',    rating: 4.3, reviews: 78  },
  { id: 4,  name: 'Slim Fit Jeans',           sizes: '28, 30, 32, 34', price: '$65.00',   stock: 200, sold: 130, category: 'Fashion',     rating: 4.6, reviews: 94  },
  { id: 5,  name: 'Wireless Headphones',      sizes: 'One Size',       price: '$199.00',  stock: 75,  sold: 60,  category: 'Electronics', rating: 4.7, reviews: 125 },
  { id: 6,  name: 'Summer Floral Dress',      sizes: 'XS, S, M, L',   price: '$55.00',   stock: 160, sold: 95,  category: 'Fashion',     rating: 4.4, reviews: 38  },
  { id: 7,  name: 'Leather Wallet',           sizes: 'One Size',       price: '$45.00',   stock: 500, sold: 320, category: 'Accessories', rating: 4.2, reviews: 200 },
  { id: 8,  name: 'Sport Watch',              sizes: 'One Size',       price: '$250.00',  stock: 55,  sold: 30,  category: 'Electronics', rating: 4.9, reviews: 67  },
  { id: 9,  name: 'Canvas Sneakers',          sizes: '6–12',           price: '$75.00',   stock: 280, sold: 190, category: 'Footwear',    rating: 4.1, reviews: 110 },
  { id: 10, name: 'Denim Jacket',             sizes: 'S, M, L, XL',   price: '$110.00',  stock: 95,  sold: 72,  category: 'Fashion',     rating: 4.5, reviews: 60  },
]

export default function ProductListPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout title="Products">
      <PageHeader
        title="All Product List"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Products' }, { label: 'List' }]}
        action={<Link href="/products/create" className="btn btn-primary">+ Add Product</Link>}
      />

      <TableCard
        title="Products"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 12px' }}>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, width: 180, fontFamily: 'inherit' }}
              />
            </div>
            <select style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}>
              <option>This Month</option><option>Last Month</option><option>All Time</option>
            </select>
          </div>
        }
      >
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 20 }}><input type="checkbox" /></th>
              <th>Product Name &amp; Size</th>
              <th>Price</th><th>Stock</th><th>Category</th><th>Rating</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, background: '#f1f5f9', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                      👕
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>{p.name}</p>
                      <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>Size: {p.sizes}</p>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{p.price}</td>
                <td>
                  <p style={{ fontSize: 13 }}><b>{p.stock} Item</b> Left</p>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>{p.sold} Sold</p>
                </td>
                <td>{p.category}</td>
                <td>
                  <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>
                    ⭐ {p.rating}
                  </span>
                  <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 6 }}>{p.reviews} Reviews</span>
                </td>
                <td><Actions onView={() => {}} onEdit={() => {}} onDelete={() => {}} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination current={page} total={3} onChange={setPage} showing={filtered.length} totalItems={products.length} />
      </TableCard>
    </DashboardLayout>
  )
}
