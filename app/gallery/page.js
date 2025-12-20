import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, Calendar, MapPin, Eye } from 'lucide-react'

export const metadata = {
  title: 'Gallery | Basho Pottery',
  description: 'Visual stories from the studio, our collections, and community gatherings.',
}

export default function GalleryPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2069&auto=format&fit=crop"
          alt="Potter shaping clay"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-stone-900/40"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Art of Earth
          </h1>
          <p className="text-xl text-stone-100 max-w-lg mx-auto font-light leading-relaxed drop-shadow-md">
            Handcrafted imperfection. Inspired by Japan, made locally in Surat.
          </p>
          
          <div className="mt-10 flex gap-4">
             <a href="#collection" className="bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-stone-100 transition-colors">
               View Collection
             </a>
             <Link href="/workshops" className="bg-basho-earth/80 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold hover:bg-basho-earth transition-colors border border-white/20">
               Book Workshop
             </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        {/* 2. FILTER BAR (Visual Only for now) */}
        <div className="flex justify-center -mt-20 relative z-10 mb-20">
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl shadow-stone-200/50 border border-white/50 flex gap-2 overflow-x-auto max-w-full">
            {['All', 'Ceramics', 'Workshops', 'Events'].map((filter, idx) => (
              <button 
                key={filter}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  idx === 0 
                  ? 'bg-basho-earth text-white shadow-md' 
                  : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 3. THE COLLECTION GRID */}
        <section id="collection" className="mb-24">
          <SectionHeader title="The Collection" subtitle="Showcase" link="/products" linkText="Shop All" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <GalleryItem 
              title="Wabi-Sabi Vases" 
              desc="Hand-thrown stoneware"
              img="https://images.unsplash.com/photo-1581783342308-f792ca11df53?q=80&w=800&auto=format&fit=crop" 
            />
            <GalleryItem 
              title="Dinner Sets" 
              desc="Matte glaze finish"
              img="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop" 
            />
            <GalleryItem 
              title="Tea Ceremony" 
              desc="Raku fired cups"
              img="https://images.unsplash.com/photo-1578749556920-d78852e77f24?q=80&w=800&auto=format&fit=crop" 
            />
            <GalleryItem 
              title="Sake Sets" 
              desc="Traditional vessels"
              img="https://images.unsplash.com/photo-1624821588755-22d76535d552?q=80&w=800&auto=format&fit=crop" 
            />
          </div>
        </section>

        {/* 4. THE PROCESS (Bento Grid) */}
        <section className="mb-24">
          <SectionHeader title="The Process" subtitle="Experience" link="/workshops" linkText="Book Class" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Card */}
            <div className="md:col-span-2 relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
              <Image 
                src="https://images.unsplash.com/photo-1565193566173-092e75df6543?q=80&w=1600"
                alt="Wheel throwing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Wheel Throwing 101</h3>
                <p className="text-stone-300 max-w-md">Learn the fundamentals of centering and shaping clay on the wheel in our introductory weekend course.</p>
              </div>
            </div>

            {/* Stacked Cards */}
            <div className="flex flex-col gap-6">
              <ProcessCard 
                title="Glazing Techniques" 
                subtitle="Next Session: Oct 12"
                img="https://images.unsplash.com/photo-1526404764434-cbf85a0684f8?q=80&w=800"
              />
              <ProcessCard 
                title="Private Group Events" 
                subtitle="Book for Teams"
                img="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800"
              />
            </div>
          </div>
        </section>

        {/* 5. EVENTS & GATHERINGS */}
        <section className="mb-24">
          <SectionHeader title="Gatherings" subtitle="Community" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EventCard 
              date="NOV 15"
              title="Autumn Tea Ceremony"
              desc="Experience the tranquility of a traditional tea service using our handcrafted Chawan bowls."
              img="https://images.unsplash.com/photo-1558521554-4742cb570530?q=80&w=800"
            />
            <EventCard 
              date="DEC 01"
              title="Winter Market Pop-up"
              desc="Shop exclusive holiday collections and meet the artisans at our annual winter studio market."
              img="https://images.unsplash.com/photo-1473188588951-e5d7ed756988?q=80&w=800"
            />
            <EventCard 
              date="JAN 10"
              title="Artist Talk: Wabi-Sabi"
              desc="A discussion on the beauty of imperfection with master potter Hiroshi Tanaka."
              img="https://images.unsplash.com/photo-1561577789-53e7f417da30?q=80&w=800"
            />
          </div>
        </section>

        {/* 6. VISIT CTA */}
        <div className="rounded-3xl bg-stone-900 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Feel the Texture</h2>
            <p className="text-stone-400 mb-10 max-w-xl mx-auto text-lg">
              Photos can only convey so much. Visit our showroom to hold the pieces and find the one that speaks to your hands.
            </p>
            <button className="inline-flex items-center justify-center rounded-full h-14 px-10 bg-basho-clay hover:bg-basho-earth text-white font-bold transition-all shadow-lg hover:scale-105">
              <MapPin size={20} className="mr-2" />
              Plan Your Visit
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// --- SUB-COMPONENTS for cleanliness ---

function SectionHeader({ title, subtitle, link, linkText }) {
  return (
    <div className="flex items-end justify-between border-b border-stone-200 pb-4 mb-8">
      <div>
        <span className="text-basho-clay text-sm font-bold uppercase tracking-wider">{subtitle}</span>
        <h2 className="text-3xl font-serif font-bold text-stone-800 mt-1">{title}</h2>
      </div>
      {link && (
        <Link href={link} className="hidden sm:flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-basho-earth transition-colors">
          {linkText} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}

function GalleryItem({ title, desc, img }) {
  return (
    <div className="group cursor-pointer flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-stone-200">
        <Image 
          src={img} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-stone-900 shadow-lg">
            <Eye size={20} />
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-stone-800 group-hover:text-basho-earth transition-colors">{title}</h3>
        <p className="text-stone-500 text-sm">{desc}</p>
      </div>
    </div>
  )
}

function ProcessCard({ title, subtitle, img }) {
  return (
    <div className="flex-1 group cursor-pointer relative rounded-2xl overflow-hidden min-h-[200px]">
      <Image 
        src={img} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-basho-clay text-xs font-bold uppercase mt-1">{subtitle}</p>
      </div>
    </div>
  )
}

function EventCard({ date, title, desc, img }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="h-48 overflow-hidden relative bg-stone-200">
        <Image 
          src={img} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-stone-900 flex items-center gap-1 shadow-sm">
          <Calendar size={12} /> {date}
        </div>
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-serif font-bold text-stone-800 group-hover:text-basho-earth transition-colors">{title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed flex-1">{desc}</p>
        <button className="mt-2 text-basho-earth text-sm font-bold uppercase tracking-wider self-start hover:underline">
          RSVP Now
        </button>
      </div>
    </div>
  )
}