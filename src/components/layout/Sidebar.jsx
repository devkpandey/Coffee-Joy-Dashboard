'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, ShoppingBag, Tag, Box, ShoppingCart, CreditCard,
  FileText, Settings, User, Shield, Users, Store, Ticket, Star,
  MessageSquare, Mail, Calendar, CheckSquare, HelpCircle, ChevronDown,
  BarChart2, Layers,
} from 'lucide-react'

const navGroups = [
  {
    section: 'General',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Products', icon: ShoppingBag, sub: [
        { label: 'List', href: '/products/list' },
        { label: 'Grid', href: '/products/grid' },
        { label: 'Create', href: '/products/create' },
      ]},
      { label: 'Category', icon: Tag, sub: [
        { label: 'List', href: '/categories' },
      ]},
      { label: 'Inventory', icon: Box, sub: [
        { label: 'Warehouse', href: '/inventory/warehouse' },
        { label: 'Received Orders', href: '/inventory/received' },
      ]},
      { label: 'Orders', icon: ShoppingCart, sub: [
        { label: 'List', href: '/orders' },
      ]},
      { label: 'Purchases', icon: CreditCard, sub: [
        { label: 'List', href: '/purchases' },
      ]},
      { label: 'Invoices', icon: FileText, sub: [
        { label: 'List', href: '/invoices' },
        { label: 'Create', href: '/invoices/create' },
      ]},
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
  {
    section: 'Users',
    items: [
      { label: 'Profile', href: '/profile', icon: User },
      { label: 'Roles', icon: Shield, sub: [{ label: 'List', href: '/roles' }] },
      { label: 'Permissions', href: '/permissions', icon: Layers },
      { label: 'Customers', icon: Users, sub: [{ label: 'List', href: '/customers' }] },
      { label: 'Sellers', icon: Store, sub: [{ label: 'List', href: '/sellers' }] },
    ],
  },
  {
    section: 'Other',
    items: [
      { label: 'Coupons', icon: Ticket, sub: [{ label: 'List', href: '/coupons' }] },
      { label: 'Reviews', href: '/reviews', icon: Star },
    ],
  },
  {
    section: 'Apps',
    items: [
      { label: 'Chat', href: '/apps/chat', icon: MessageSquare },
      { label: 'Email', href: '/apps/email', icon: Mail },
      { label: 'Calendar', href: '/apps/calendar', icon: Calendar },
      { label: 'Todo', href: '/apps/todo', icon: CheckSquare },
    ],
  },
  {
    section: 'Support',
    items: [
      { label: 'Help Center', href: '/support/help', icon: HelpCircle },
      { label: 'FAQs', href: '/support/faqs', icon: HelpCircle },
    ],
  },
]

function NavItem({ item, collapsed }) {
  const pathname = usePathname()
  const isActive = item.href
    ? pathname === item.href
    : item.sub?.some((s) => pathname === s.href)
  const [open, setOpen] = useState(isActive || false)

  if (item.sub) {
    return (
      <li>
        <button
          onClick={() => setOpen(!open)}
          className={`sidebar-link${isActive ? ' active' : ''}`}
          style={{ width: '100%', justifyContent: collapsed ? 'center' : 'space-between' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <item.icon size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{item.label}</span>}
          </span>
          {!collapsed && (
            <ChevronDown
              size={14}
              style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          )}
        </button>
        {open && !collapsed && (
          <ul style={{ paddingLeft: 28, marginTop: 2, borderLeft: '1px solid rgba(255,255,255,0.08)', marginLeft: 24, listStyle: 'none' }}>
            {item.sub.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className={`sidebar-sub-link${pathname === s.href ? ' active' : ''}`}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li>
      <Link
        href={item.href}
        className={`sidebar-link${pathname === item.href ? ' active' : ''}`}
        style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
      >
        <item.icon size={18} style={{ flexShrink: 0 }} />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    </li>
  )
}

export default function Sidebar({ collapsed }) {
  return (
    <aside
      style={{
        width: collapsed ? 72 : 260,
        background: '#1a2035',
        minHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        transition: 'width 0.25s',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 34, height: 34, background: '#3b82f6', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <BarChart2 size={18} color="#fff" />
        </div>
        {!collapsed && (
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, marginLeft: 10 }}>
            Larkon
          </span>
        )}
      </div>

      {/* Nav */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '12px 8px' }}>
        {navGroups.map((group) => (
          <div key={group.section} style={{ marginBottom: 16 }}>
            {!collapsed && (
              <p
                style={{
                  fontSize: 10, fontWeight: 700, color: '#475569',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  padding: '4px 14px 6px', marginBottom: 2,
                }}
              >
                {group.section}
              </p>
            )}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {group.items.map((item) => (
                <NavItem key={item.label} item={item} collapsed={collapsed} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
