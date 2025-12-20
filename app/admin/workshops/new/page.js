'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function NewWorkshopPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    duration: '3 Hours',
    maxStudents: '8',
    location: 'Studio A, Surat',
    language: 'English',
    level: 'Beginner',
    instructorName: 'Shivangi',
    instructorRole: 'Lead Ceramist',
    instructorImage: '',
    sessions: [
      { date: '', time: '10:00 AM' } // Start with one empty session
    ]
  })

  // Handle Basic Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle Dynamic Session Inputs
  const handleSessionChange = (index, field, value) => {
    const newSessions = [...formData.sessions]
    newSessions[index][field] = value
    setFormData({ ...formData, sessions: newSessions })
  }

  const addSession = () => {
    setFormData({
      ...formData,
      sessions: [...formData.sessions, { date: '', time: '10:00 AM' }]
    })
  }

  const removeSession = (index) => {
    const newSessions = formData.sessions.filter((_, i) => i !== index)
    setFormData({ ...formData, sessions: newSessions })
  }

  // Submit to API
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/admin/workshops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      router.push('/admin/workshops') // Redirect to list
      router.refresh()
    } else {
      alert('Error creating workshop')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-stone-50 min-h-screen">
      <Link href="/admin/workshops" className="inline-flex items-center text-stone-500 hover:text-basho-earth mb-8">
        <ArrowLeft size={18} className="mr-2" /> Back to Workshops
      </Link>

      <h1 className="font-serif text-3xl text-stone-800 mb-8">Schedule New Workshop</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Info */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <h2 className="font-bold text-lg text-stone-800 border-b pb-2">Workshop Details</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Workshop Title</label>
              <input required name="title" onChange={handleChange} className="w-full p-3 border rounded-xl" placeholder="e.g. Intro to Wheel Throwing" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea required name="description" onChange={handleChange} rows={4} className="w-full p-3 border rounded-xl" placeholder="Describe the experience..." />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price (₹)</label>
              <input required type="number" name="price" onChange={handleChange} className="w-full p-3 border rounded-xl" />
            </div>
             
             {/* Simple Image URL Input for now */}
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input required name="image" onChange={handleChange} className="w-full p-3 border rounded-xl" placeholder="https://..." />
            </div>
          </div>
        </div>

        {/* Section 2: Logistics */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <h2 className="font-bold text-lg text-stone-800 border-b pb-2">Logistics</h2>
          <div className="grid grid-cols-2 gap-6">
            <input name="duration" onChange={handleChange} value={formData.duration} className="p-3 border rounded-xl" placeholder="Duration" />
            <input name="maxStudents" onChange={handleChange} value={formData.maxStudents} className="p-3 border rounded-xl" placeholder="Max Students" />
            <input name="location" onChange={handleChange} value={formData.location} className="p-3 border rounded-xl" placeholder="Location" />
            <input name="language" onChange={handleChange} value={formData.language} className="p-3 border rounded-xl" placeholder="Language" />
          </div>
        </div>

        {/* Section 3: Sessions (Dynamic Dates) */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="font-bold text-lg text-stone-800">Session Dates</h2>
            <button type="button" onClick={addSession} className="text-sm flex items-center gap-1 text-basho-earth font-medium">
              <Plus size={16} /> Add Date
            </button>
          </div>

          {formData.sessions.map((session, index) => (
            <div key={index} className="flex gap-4 items-end bg-stone-50 p-4 rounded-xl">
              <div className="flex-1">
                <label className="block text-xs font-bold text-stone-500 mb-1">Date</label>
                <input 
                  type="date" 
                  required 
                  value={session.date}
                  onChange={(e) => handleSessionChange(index, 'date', e.target.value)}
                  className="w-full p-2 border rounded-lg" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-stone-500 mb-1">Time</label>
                <input 
                  type="text" 
                  value={session.time}
                  onChange={(e) => handleSessionChange(index, 'time', e.target.value)}
                  className="w-full p-2 border rounded-lg" 
                  placeholder="e.g. 10:00 AM" 
                />
              </div>
              {formData.sessions.length > 1 && (
                <button type="button" onClick={() => removeSession(index)} className="p-2 text-red-400 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button 
          disabled={loading}    
          type="submit" 
          className="w-full bg-basho-earth text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Publishing...' : 'Publish Workshop'}
        </button>

      </form>
    </div>
  )
}