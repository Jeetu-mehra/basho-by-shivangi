import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db' 
import { 
  Clock, 
  Users, 
  MapPin, 
  Languages, 
  ChevronDown, 
  CheckCircle, 
  Lock, 
  Star, 
  Info 
} from 'lucide-react'

// 1. GENERATE DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { id } = await params
  
  const workshop = await prisma.workshop.findUnique({
    where: { id }
  })

  if (!workshop) return { title: 'Workshop Not Found' }

  return {
    title: `${workshop.title} | Basho Workshops`,
    description: workshop.description,
    openGraph: {
      images: [workshop.image],
    },
  }
}

// 2. MAIN SERVER COMPONENT
export default async function WorkshopDetailsPage({ params }) {
  const { id } = await params

  // Fetch real data from DB with Sessions included
  const workshop = await prisma.workshop.findUnique({
    where: { id },
    include: {
      sessions: {
        orderBy: { date: 'asc' }, // Show nearest dates first
        where: { date: { gte: new Date() } } // Only show future dates
      }
    }
  })

  // 404 Handling
  if (!workshop) notFound()

  // Fallback for gallery if empty
  const galleryImages = workshop.gallery && workshop.gallery.length > 0 
    ? workshop.gallery 
    : [workshop.image]

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 font-sans">
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-sm text-stone-500">
          <Link href="/" className="hover:text-basho-earth transition-colors">Home</Link>
          <span className="text-stone-300">/</span>
          <Link href="/workshops" className="hover:text-basho-earth transition-colors">Workshops</Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-800 font-medium truncate max-w-[200px]">{workshop.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* --- LEFT COLUMN: CONTENT --- */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden group shadow-md bg-stone-200">
                {workshop.image ? (
                  <Image 
                    src={workshop.image} 
                    alt={workshop.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-stone-400">No Image</div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                  {workshop.level && (
                    <span className="bg-basho-clay text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                      {workshop.level}
                    </span>
                  )}
                  <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
                    {workshop.title}
                  </h1>
                </div>
              </div>

              {/* Meta Data */}
              <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-stone-200">
                <MetaItem icon={<Clock size={18} />} text={workshop.duration} />
                <MetaItem icon={<Users size={18} />} text={`Max ${workshop.maxStudents} Students`} />
                <MetaItem icon={<MapPin size={18} />} text={workshop.location} />
                <MetaItem icon={<Languages size={18} />} text={workshop.language} />
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-stone prose-lg max-w-none">
              <h3 className="font-serif text-2xl font-bold text-stone-800 mb-4">About the Workshop</h3>
              <p className="text-stone-600 leading-relaxed mb-4 whitespace-pre-wrap">
                {workshop.description}
              </p>
            </div>

            {/* Accordions (Static Content for now, or add to DB if needed) */}
            <div className="flex flex-col gap-4">
              <Accordion title="What You'll Learn">
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>Fundamentals of hand-building and pinching techniques.</li>
                  <li>Understanding clay stages: slip, plastic, leather-hard.</li>
                  <li>Texturing methods using natural tools.</li>
                  <li>Basic glazing theory and selection.</li>
                </ul>
              </Accordion>
              
              <Accordion title="What's Included">
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>All necessary high-fire stoneware clay.</li>
                  <li>Use of all studio tools and aprons.</li>
                  <li>Firing and glazing services.</li>
                  <li>Refreshments during the break.</li>
                </ul>
              </Accordion>
            </div>

            {/* Instructor */}
            <div className="flex items-start gap-6 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-basho-earth shrink-0 bg-stone-200">
                {workshop.instructorImage && (
                  <Image src={workshop.instructorImage} alt={workshop.instructorName} fill className="object-cover" />
                )}
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-800">{workshop.instructorName}</h4>
                <p className="text-sm text-basho-clay font-medium mb-2">{workshop.instructorRole}</p>
                <p className="text-sm text-stone-500">
                  Expert guidance provided by our resident ceramicist.
                </p>
              </div>
            </div>

            {/* Gallery */}
            <div>
              <h3 className="font-serif text-2xl font-bold mb-6 text-stone-800">Student Works</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((img, i) => (
                  <div key={i} className="relative h-40 rounded-xl overflow-hidden bg-stone-200">
                    <Image 
                      src={img} 
                      alt={`Gallery image ${i+1}`} 
                      fill 
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <div id="registration" className="pt-8 border-t border-stone-200">
              <h3 className="font-serif text-2xl font-bold mb-2 text-stone-800">Complete Registration</h3>
              <p className="text-stone-500 mb-8">Please fill in your details to secure your spot.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="First Name" placeholder="Jane" />
                  <Input label="Last Name" placeholder="Doe" />
                </div>
                <Input label="Email Address" type="email" placeholder="jane@example.com" />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Experience Level</label>
                  <select className="w-full rounded-xl border-stone-200 bg-white px-4 py-3 text-sm focus:border-basho-earth focus:ring-basho-earth outline-none transition-all">
                    <option>Total Beginner</option>
                    <option>Some Experience</option>
                    <option>Intermediate</option>
                  </select>
                </div>

                <div className="p-4 bg-basho-earth/10 rounded-xl flex gap-3 items-start text-basho-earth">
                  <Info size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">Payment will be collected via Stripe securely. You will receive a confirmation email immediately.</p>
                </div>

                <button type="button" className="w-full md:w-auto bg-basho-earth hover:bg-stone-800 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg active:scale-95">
                  Confirm Booking
                </button>
              </form>
            </div>

          </div>

          {/* --- RIGHT COLUMN: STICKY BOOKING --- */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 flex flex-col gap-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-xl shadow-stone-200/50 border border-stone-200">
                <div className="flex items-end gap-2 mb-6 border-b border-stone-100 pb-6">
                  <span className="text-4xl font-serif font-bold text-stone-800">₹{workshop.price}</span>
                  <span className="text-stone-400 mb-1.5 font-medium">/ person</span>
                </div>

                <div className="space-y-6">
                  {/* Date Selector */}
                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-3">Select a Session</label>
                    {workshop.sessions.length > 0 ? (
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {workshop.sessions.map((session, index) => {
                          const dateObj = new Date(session.date);
                          const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                          const day = dateObj.getDate();
                          return (
                            <DateButton 
                              key={session.id} 
                              month={month} 
                              day={day} 
                              active={index === 0} // Select first by default
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-stone-500 italic">No upcoming sessions available.</p>
                    )}
                  </div>

                  {/* Time Display */}
                  {workshop.sessions.length > 0 && (
                    <div>
                       <label className="block text-sm font-bold text-stone-800 mb-3">Time</label>
                       <div className="py-2.5 px-4 rounded-lg border-2 border-basho-clay bg-basho-clay/10 text-basho-clay text-sm font-bold shadow-sm inline-block">
                          {workshop.sessions[0]?.time}
                       </div>
                       <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
                        <CheckCircle size={14} />
                        Available
                      </p>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="bg-stone-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Workshop Fee</span>
                      <span className="font-medium text-stone-900">₹{workshop.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Materials</span>
                      <span className="font-medium text-stone-900">Included</span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-stone-200 mt-2">
                      <span className="text-stone-800">Total</span>
                      <span className="text-stone-800">₹{workshop.price}</span>
                    </div>
                  </div>

                  <a 
                    href="#registration"
                    className={`flex w-full items-center justify-center rounded-xl h-12 bg-stone-900 text-white text-base font-bold hover:bg-basho-earth transition-colors shadow-lg ${workshop.sessions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Proceed to Register
                  </a>

                  <div className="flex justify-center items-center gap-2 text-xs text-stone-400">
                    <Lock size={12} />
                    Secure booking powered by Stripe
                  </div>
                </div>
              </div>

              {/* Mini Testimonial */}
              <div className="bg-basho-clay/10 rounded-2xl p-6 border border-basho-clay/20">
                <div className="flex gap-1 text-basho-clay mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm italic text-stone-700 mb-3">"An incredibly grounding experience. I still use the cup I made every morning."</p>
                <p className="text-xs font-bold text-stone-500">— Sarah J.</p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

// --- SUB COMPONENTS ---

function MetaItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-stone-500">
      <span className="text-basho-clay">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}

function Accordion({ title, children }) {
  return (
    <details className="group bg-white rounded-xl border border-stone-200 overflow-hidden open:shadow-sm transition-all">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
        <span className="text-lg font-bold text-stone-800">{title}</span>
        <ChevronDown className="text-stone-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5">
        {children}
      </div>
    </details>
  )
}

function Input({ label, type = "text", placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-stone-700">{label}</label>
      <input 
        type={type}
        className="w-full rounded-xl border-stone-200 bg-white px-4 py-3 text-sm focus:border-basho-earth focus:ring-basho-earth outline-none transition-all" 
        placeholder={placeholder} 
      />
    </div>
  )
}

function DateButton({ month, day, active }) {
  return (
    <button className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl border-2 transition-all ${
      active 
        ? 'border-basho-clay bg-basho-clay/10 text-basho-clay' 
        : 'border-stone-200 text-stone-400 hover:border-basho-clay/50 hover:text-basho-clay'
    }`}>
      <span className="text-xs font-bold">{month}</span>
      <span className="text-lg font-bold">{day}</span>
    </button>
  )
}