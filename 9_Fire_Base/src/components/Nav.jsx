import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function Nav({ user }){
  const navigate = useNavigate()
  const doSignOut = async ()=>{
    await signOut(auth)
    navigate('/login')
  }
  return (
    <nav className="bg-white shadow">
      <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold">MyApp</Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm">{user.email}</span>
              <button onClick={doSignOut} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 border rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
