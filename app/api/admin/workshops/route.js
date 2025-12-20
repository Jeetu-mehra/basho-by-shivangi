import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// 1. GET: Fetch all workshops for the Admin List
export async function GET() {
  try {
    const workshops = await prisma.workshop.findMany({
      include: { sessions: true }, // Include dates to show count
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(workshops)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 })
  }
}

// 2. POST: Create a new Workshop + Sessions
export async function POST(req) {
  try {
    const body = await req.json()
    
    // Create the Workshop AND its Sessions in one go
    const workshop = await prisma.workshop.create({
      data: {
        title: body.title,
        slug: body.title.toLowerCase().replace(/ /g, '-'), // Auto-generate slug
        description: body.description,
        price: parseFloat(body.price),
        image: body.image,
        gallery: [body.image], // Default gallery to main image for now
        
        duration: body.duration,
        maxStudents: parseInt(body.maxStudents),
        location: body.location,
        language: body.language,
        level: body.level,
        
        instructorName: body.instructorName,
        instructorRole: body.instructorRole,
        instructorImage: body.instructorImage,
        
        status: 'ACTIVE',
        
        // ✨ Magic: Create related sessions automatically
        sessions: {
          create: body.sessions.map(session => ({
            date: new Date(session.date), // Convert string to Date object
            time: session.time,
            spotsTotal: parseInt(body.maxStudents),
            spotsBooked: 0
          }))
        }
      }
    })

    return NextResponse.json(workshop)
  } catch (error) {
    console.error("Workshop Create Error:", error)
    return NextResponse.json({ error: 'Error creating workshop' }, { status: 500 })
  }
}