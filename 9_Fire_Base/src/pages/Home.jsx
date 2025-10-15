import React from 'react'
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'

export default function Home({ user }){
  const [notes, setNotes] = React.useState([])
  const [title, setTitle] = React.useState('')
  const [editingId, setEditingId] = React.useState(null)

  React.useEffect(()=>{
    const q = query(collection(db,'notes'))
    const unsub = onSnapshot(q, snap => {
      setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  },[])

  const addNote = async (e) => {
    e.preventDefault()
    if(!title) return
    if(editingId){
      await updateDoc(doc(db,'notes',editingId), { title })
      setEditingId(null)
      setTitle('')
      return
    }
    await addDoc(collection(db,'notes'), { title, uid: user.uid, createdAt: new Date() })
    setTitle('')
  }

  const remove = async (id) => {
    await deleteDoc(doc(db,'notes',id))
  }

  const startEdit = (note) => {
    setEditingId(note.id)
    setTitle(note.title)
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>
      <form onSubmit={addNote} className="mb-4 flex gap-2">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New note" className="flex-1 p-2 border rounded" />
        <button className="p-2 bg-indigo-600 text-white rounded">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <ul className="space-y-2">
        {notes.map(n => (
          <li key={n.id} className="p-2 border rounded flex justify-between items-center">
            <div>{n.title}</div>
            <div className="flex gap-2">
              <button onClick={()=>startEdit(n)} className="px-2 py-1 border rounded">Edit</button>
              <button onClick={()=>remove(n.id)} className="px-2 py-1 border rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
