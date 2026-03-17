'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { PageHeader } from '@/components/ui'

export default function CreateInvoicePage() {
  const [items, setItems] = useState([
    { desc: 'Product Design', qty: 2, price: 150, total: 300 },
  ])

  function addItem() {
    setItems([...items, { desc: '', qty: 1, price: 0, total: 0 }])
  }

  function removeItem(i) {
    setItems(items.filter((_, j) => j !== i))
  }

  function updateItem(i, field, val) {
    const next = [...items]
    next[i][field] = val
    next[i].total = next[i].qty * next[i].price
    setItems(next)
  }

  const subtotal = items.reduce((s, it) => s + it.total, 0)
  const tax      = subtotal * 0.1
  const total    = subtotal + tax

  return (
    <DashboardLayout title="Invoices">
      <PageHeader
        title="Create Invoice"
        crumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Invoices' }, { label: 'Create' }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Header */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <h3 style={{ fontWeight: 900, fontSize: 24, color: '#3b82f6', marginBottom: 4 }}>LARKON</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>123 Commerce Street<br />New York, NY 10001<br />contact@larkon.com</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ fontWeight: 800, fontSize: 28, color: '#1e293b' }}>INVOICE</h2>
                <p style={{ fontSize: 14, color: '#64748b', marginTop: 6 }}>#INV-2024</p>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <h5 style={{ fontWeight: 700, color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Bill To</h5>
                <input className="form-control" placeholder="Client Name" style={{ marginBottom: 10 }} />
                <input className="form-control" placeholder="Client Email" style={{ marginBottom: 10 }} />
                <textarea className="form-control" placeholder="Client Address" rows={3} />
              </div>
              <div>
                <h5 style={{ fontWeight: 700, color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Invoice Details</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div><label className="form-label">Invoice Date</label><input className="form-control" type="date" /></div>
                  <div><label className="form-label">Due Date</label><input className="form-control" type="date" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="card" style={{ padding: 24 }}>
            <h5 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 16, fontSize: 15 }}>Invoice Items</h5>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Description</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', width: 80 }}>Qty</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', width: 120 }}>Price</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', width: 120 }}>Total</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 12px' }}>
                      <input className="form-control" value={item.desc} onChange={(e) => updateItem(i, 'desc', e.target.value)} placeholder="Item description" />
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <input className="form-control" type="number" value={item.qty} style={{ textAlign: 'center' }} onChange={(e) => updateItem(i, 'qty', Number(e.target.value))} />
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <input className="form-control" type="number" value={item.price} onChange={(e) => updateItem(i, 'price', Number(e.target.value))} />
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700 }}>${item.total.toFixed(2)}</td>
                    <td style={{ padding: '8px 12px' }}>
                      <button onClick={() => removeItem(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16 }}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={addItem} className="btn btn-outline" style={{ marginTop: 14, fontSize: 13 }}>+ Add Item</button>

            {/* Totals */}
            <div style={{ marginTop: 20, borderTop: '2px solid #f1f5f9', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ minWidth: 220 }}>
                {[['Subtotal', `$${subtotal.toFixed(2)}`], ['Tax (10%)', `$${tax.toFixed(2)}`]].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                    <span style={{ color: '#64748b' }}>{l}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '2px solid #1e293b', fontSize: 16 }}>
                  <span style={{ fontWeight: 800 }}>Total</span>
                  <span style={{ fontWeight: 800, color: '#3b82f6' }}>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 24 }}>
            <h5 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Payment Info</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label className="form-label">Payment Method</label>
                <select className="form-control"><option>Credit Card</option><option>PayPal</option><option>Bank Transfer</option></select>
              </div>
              <div>
                <label className="form-label">Currency</label>
                <select className="form-control"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option></select>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h5 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Notes</h5>
            <textarea className="form-control" rows={4} placeholder="Additional notes for the client..." />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-primary" style={{ justifyContent: 'center', padding: 13, fontSize: 15 }}>📤 Send Invoice</button>
            <button className="btn btn-light"   style={{ justifyContent: 'center', padding: 13, fontSize: 15 }}>💾 Save Draft</button>
            <button className="btn btn-outline" style={{ justifyContent: 'center', padding: 13, fontSize: 15 }}>🖨 Print Invoice</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
