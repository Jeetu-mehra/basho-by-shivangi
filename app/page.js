"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Philosophy (Takes up 7 cols on desktop) */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="lg:col-span-7 flex flex-col gap-16"
        >
          {/* Section 1: Impermanence */}
          <motion.div variants={fadeIn} className="space-y-6">
            <div className="border-l-2 border-stone-300 pl-6">
              <h2 className="font-serif text-3xl md:text-5xl text-stone-900 mb-2">
                The Beauty of Impermanence
              </h2>
              <p className="text-stone-500 font-medium tracking-wide uppercase text-sm">
                Philosophy & Aesthetics
              </p>
            </div>
            
            <div className="prose prose-stone prose-lg text-stone-600 leading-relaxed">
              <p>
                At the heart of Japanese culture lies <span className="italic text-stone-800 font-serif">Wabi-sabi</span>—a 
                worldview centered on the acceptance of transience and imperfection. 
                It is a beauty that is <span className="italic text-stone-800">imperfect, impermanent, and incomplete</span>.
              </p>
              <p>
                In our pottery, this manifests as a celebration of the artisan’s touch. 
                The slight asymmetry of a hand-thrown bowl or the unpredictable crackle 
                of a kiln’s glaze are not flaws, but the marks of a living object.
              </p>
            </div>
          </motion.div>

          {/* Section 2: Basho */}
          <motion.div variants={fadeIn} className="space-y-6">
            <div className="border-l-2 border-stone-300 pl-6">
              <h2 className="font-serif text-3xl md:text-5xl text-stone-900 mb-2">
                The Way of the Wanderer
              </h2>
              <p className="text-stone-500 font-medium tracking-wide uppercase text-sm">
                The Spirit of Matsuo Bashō
              </p>
            </div>

            <div className="prose prose-stone prose-lg text-stone-600 leading-relaxed">
              <p>
                <span className="italic text-stone-800 font-serif">Matsuo Bashō</span>, the 17th-century haiku master, viewed life as a journey 
                and art as a bridge to the eternal. His philosophy, <span className="italic text-stone-800">Fueki-Ryuko</span>, 
                reminds us that true art balances the timeless with the ephemeral.
              </p>
              <p>
                He taught the concept of <span className="italic text-stone-800">Karumi</span> (lightness)—finding 
                the profound within the ordinary. It is the same lightness we aim to 
                bring to your table. Through Bashō’s eyes, we learn that a simple morning tea is a 
                poem in motion, and every cup is a sanctuary.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Brand Identity (Sticky on Desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-stone-100"
        >
          {/* Logo */}
          <div className="w-48 mb-8 opacity-90 hover:opacity-100 transition-opacity">
            <img src="/brand/logo-basho-byy-shivangi.png" alt="Basho Logo" className="w-full h-auto" />
          </div>

          {/* Founder Image */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8">
            <div className="absolute inset-0 rounded-full border border-stone-200 translate-x-2 translate-y-2"></div>
            <img 
              src="/brand/founder.jpg" 
              alt="Shivangi, Founder" 
              className="w-full h-full object-cover rounded-full relative z-10 shadow-md grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Founder Note */}
          <div className="space-y-4">
            <p className="text-stone-600 italic font-light text-lg leading-relaxed">
              "Basho is handcrafted, raw, earthy ceramic pieces including custom and ready-made tableware."
            </p>
            <div className="w-12 h-px bg-stone-300 mx-auto"></div>
            <p className="font-serif text-stone-900 text-lg">
              Shivangi, Founder
            </p>
          </div>
        </motion.div>
      </section>


      {/* --- SEPARATOR --- */}
      <div className="w-full py-16 flex items-center justify-center">
        <div className="h-px w-1/4 bg-stone-300"></div>
        <span className="px-6 font-serif text-3xl md:text-4xl italic text-stone-400">Our Collections</span>
        <div className="h-px w-1/4 bg-stone-300"></div>
      </div>


      {/* --- COLLECTIONS GRID --- */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <CollectionCategory 
            title="Products" 
            subtitle="Hand-thrown ceramics" 
            images={["/showcase/products/1.png", "/showcase/products/2.png", "/showcase/products/3.png"]}
            link="/products"
          />
          
          <CollectionCategory 
            title="Workshops" 
            subtitle="Learn the art of clay" 
            images={["/showcase/products/1.png", "/showcase/products/2.png", "/showcase/products/3.png"]}
            link="/workshops"
          />
          
          <CollectionCategory 
            title="Events" 
            subtitle="Community gatherings" 
            images={["/showcase/products/1.png", "/showcase/products/2.png", "/showcase/products/3.png"]}
            link="/events"
          />
          
          <CollectionCategory 
            title="Experiences" 
            subtitle="Studio visits & more" 
            images={["/showcase/products/1.png", "/showcase/products/2.png", "/showcase/products/3.png"]}
            link="/media"
          />
        
        </div>
      </section>
    </main>
  );
};

// --- Reusable Component for the Grid ---
function CollectionCategory({ title, subtitle, images, link }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-end mb-4 px-2">
        <div>
          <h3 className="font-serif text-3xl text-stone-800 group-hover:text-stone-600 transition-colors">{title}</h3>
          <p className="text-stone-500 text-sm">{subtitle}</p>
        </div>
        <div className="p-2 rounded-full border border-stone-200 group-hover:bg-stone-800 group-hover:text-white transition-all duration-300">
          <ArrowRight size={20} />
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-2 aspect-[16/9] overflow-hidden rounded-lg bg-stone-200">
        {images.map((src, i) => (
          <div key={i} className="relative h-full w-full overflow-hidden">
             <img 
               src={src} 
               className="h-full w-full object-cover transform hover:scale-110 transition-transform duration-700 ease-in-out" 
               alt={`${title} showcase ${i + 1}`}
             />
          </div>
        ))}
      </div>
    </motion.div>
  );
}