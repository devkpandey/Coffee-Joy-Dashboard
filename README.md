# Larkon – Next.js Ecommerce Admin Dashboard

Pure JavaScript (JSX) — no TypeScript at all.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open → http://localhost:3000  
Login with any email/password → goes to Dashboard.

## 📁 Structure

```
src/
├── app/
│   ├── layout.jsx
│   ├── page.jsx              → redirects to /login
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── dashboard/page.jsx
│   ├── products/
│   │   ├── list/page.jsx
│   │   ├── grid/page.jsx
│   │   └── create/page.jsx
│   ├── orders/page.jsx
│   ├── customers/page.jsx
│   ├── invoices/
│   │   ├── page.jsx
│   │   └── create/page.jsx
│   ├── categories/page.jsx
│   ├── settings/page.jsx
│   └── profile/page.jsx
└── components/
    ├── layout/
    │   ├── Sidebar.jsx
    │   ├── Topbar.jsx
    │   └── DashboardLayout.jsx
    └── ui/
        └── index.jsx
```

## 🛠 Tech Stack

- **Next.js 14** (App Router, JavaScript only)
- **Tailwind CSS**
- **Recharts** (dashboard charts)
- **Lucide React** (icons)
