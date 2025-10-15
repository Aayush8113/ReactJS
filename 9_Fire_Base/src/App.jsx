import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Nav from './components/Nav'

function App() {
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return unsub
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav user={user} />
      <div className="max-w-3xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
