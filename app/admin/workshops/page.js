'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Calendar, Users, Clock } from 'lucide-react'

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/workshops')
      .then(res => res.json())
      .then(data => {
        setWorkshops(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8 text-stone-400">Loading schedule...</div>

  return (
    <div className="p-8 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-stone-800">Workshops</h1>
          <p className="text-stone-500">Manage your classes and sessions</p>
        </div>
        <Link 
          href="/admin/workshops/new" 
          className="bg-basho-earth text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-stone-800 transition-colors"
        >
          <Plus size={20} />
          Schedule New Workshop
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map(workshop => (
          <div key={workshop.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
            {/* Image Header */}
            <div className="relative h-48 bg-stone-200">
              <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {workshop.status}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">{workshop.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-6">
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-basho-clay" />
                  {workshop.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} className="text-basho-clay" />
                  Max {workshop.maxStudents}
                </div>
              </div>

              {/* Sessions List */}
              <div className="bg-stone-50 rounded-xl p-4 mb-4">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Upcoming Sessions</h4>
                <div className="space-y-2">
                  {workshop.sessions.length > 0 ? workshop.sessions.map(session => (
                    <div key={session.id} className="flex justify-between text-sm">
                      <span className="font-medium text-stone-700">
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                      <span className="text-stone-500">{session.time}</span>
                    </div>
                  )) : (
                    <p className="text-xs text-stone-400 italic">No dates scheduled</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                <span className="font-bold text-lg">₹{workshop.price}</span>
                <button className="text-sm font-medium text-basho-earth hover:underline">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}