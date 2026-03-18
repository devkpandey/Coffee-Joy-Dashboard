'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch , useSelector } from 'react-redux'
import { sellerLoginThunk } from '../redux/features/sellerAuthSlice'
import OTPInput from '@/components/OTPInput'


export default function LoginPage() {
  const router = useRouter()
  const [sellerData , setSellerData] = useState({
    email : "",
    password : ""
  })
  const dispatch = useDispatch()
 
  const {otpSent , seller}= useSelector((state)=> state.seller)

 
  const handleOnChnage = (e)=>{
    const {name , value} = e.target
    setSellerData({...sellerData , [name]: value})
  }

  const handleLogin = (e) => {
  e.preventDefault(); // 🔥 stop page reload

  console.log("Sending data:", sellerData); // debug

  dispatch(sellerLoginThunk(sellerData));
};

  console.log("this is the seller data:" , sellerData)

if(otpSent){
  return <OTPInput  email={sellerData.email}/>
}
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f0f4f8' }}>
      {/* Left panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 20, padding: 48, boxShadow: '0 4px 40px rgba(0,0,0,0.08)' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, background: '#3b82f6', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 20 }}>L</span>
            </div>
            <span style={{ fontWeight: 900, fontSize: 24, color: '#1e293b' }}>Larkon</span>
          </div>

          <h2 style={{ fontWeight: 800, fontSize: 26, color: '#1e293b', marginBottom: 8 }}>Sign In</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>
            Enter your email address and password to access admin panel.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name='email'
                value={sellerData.email}
                onChange={handleOnChnage}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <Link href="#" style={{ fontSize: 13, color: '#3b82f6', textDecoration: 'none' }}>Reset password</Link>
              </div>
              <input
                className="form-control"
                type="password"
                name='password'
                value={ sellerData.password}
                onChange={handleOnChnage}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ justifyContent: 'center', padding: '12px 0', fontSize: 15 }}
            >
              Sign In
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-outline" style={{ justifyContent: 'center' }}>
              🌐 Sign in with Google
            </button>
            <button className="btn btn-soft-primary" style={{ justifyContent: 'center' }}>
              📘 Sign in with Facebook
            </button>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Manage Your Store</h2>
          <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.8 }}>
            Powerful ecommerce admin panel to manage products, orders, customers, and more — all in one place.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 40 }}>
            {[['📦', '13,647', 'Total Orders'], ['💰', '$123.6k', 'Revenue'], ['👥', '22.6k', 'Customers'], ['⭐', '4.8', 'Avg Rating']].map(([icon, val, label]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 28 }}>{icon}</div>
                <p style={{ fontWeight: 800, fontSize: 20, marginTop: 6 }}>{val}</p>
                <p style={{ fontSize: 12, opacity: 0.8 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
