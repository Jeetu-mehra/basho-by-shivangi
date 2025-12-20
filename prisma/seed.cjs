const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding...')

  // 1. Clean the database (Delete old data to avoid duplicates)
  // Note: We delete in order to avoid foreign key constraint errors
  console.log('🧹 Cleaning database...')
  
  // Cleanup NEW Workshop models first (children first)
  try {
    await prisma.workshopRegistration.deleteMany()
    await prisma.workshopSession.deleteMany()
    await prisma.workshop.deleteMany()
  } catch (e) {
    console.log('Note: Workshop tables might not exist yet, skipping cleanup for them.')
  }

  // Cleanup Store models
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Database cleaned.')

  // 2. Create Categories
  const tableware = await prisma.category.create({
    data: {
      name: 'Tableware',
      slug: 'tableware',
      description: 'Functional pottery for daily rituals.',
    }
  })

  const decor = await prisma.category.create({
    data: {
      name: 'Home Decor',
      slug: 'decor',
      description: 'Vases and statement pieces for your sanctuary.',
    }
  })

  // Note: We keep the "Workshops" category for simple product listings if needed,
  // even though we have a dedicated Workshop model now.
  const workshopsCat = await prisma.category.create({
    data: {
      name: 'Workshops',
      slug: 'workshops',
      description: 'Hands-on experiences at the studio.',
    }
  })

  console.log('📁 Categories created.')

  // 3. Create Products (Store Items)
  const products = [
    {
      name: 'Wabi-Sabi Matcha Bowl',
      slug: 'wabi-sabi-matcha-bowl',
      description: 'Hand-pinched tea bowl with a rustic Shino glaze. Perfect for your morning ceremony.',
      price: 1800,
      stock: 12,
      images: ['https://images.unsplash.com/photo-1578749556920-d78852e77f24?q=80&w=800&auto=format&fit=crop'],
      categoryId: tableware.id
    },
    {
      name: 'Stoneware Dinner Set (4pc)',
      slug: 'stoneware-dinner-set',
      description: 'A complete dinner set including dinner plate, quarter plate, and bowl. Finished in matte white.',
      price: 4500,
      stock: 5,
      images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop'],
      categoryId: tableware.id
    },
    {
      name: 'Speckled Clay Vase',
      slug: 'speckled-clay-vase',
      description: 'Tall cylindrical vase made from speckled clay, left unglazed on the outside for texture.',
      price: 2200,
      stock: 8,
      images: ['https://images.unsplash.com/photo-1581783342308-f792ca11df53?q=80&w=800&auto=format&fit=crop'],
      categoryId: decor.id
    }
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }
  console.log(`📦 Added ${products.length} products.`)

  // 4. Create WORKSHOPS (The New Model)
  console.log('🔨 Creating Workshops...')
  
  const workshop1 = await prisma.workshop.create({
    data: {
      title: 'Intro to Wheel Throwing',
      slug: 'intro-wheel-throwing',
      description: 'Get your hands dirty in this comprehensive introduction to the potter\'s wheel. You will learn the basics of centering clay, opening, pulling walls, and shaping simple vessels. Perfect for complete beginners who want to experience the magic of making.',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1565193566173-092e75df6543?q=80&w=1974&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1770',
        'https://images.unsplash.com/photo-1578749556935-ef887c471986?q=80&w=1770'
      ],
      duration: '3 Hours',
      maxStudents: 8,
      location: 'Studio A, Surat',
      language: 'English / Gujarati',
      level: 'Beginner',
      instructorName: 'Shivangi',
      instructorRole: 'Lead Ceramist',
      instructorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888',
      status: 'ACTIVE',
      // Create Sessions (Dates) directly here
      sessions: {
        create: [
          {
            date: new Date('2025-10-15T10:00:00Z'), // Future date 1
            time: '10:00 AM',
            spotsTotal: 8,
            spotsBooked: 0
          },
          {
            date: new Date('2025-10-22T14:00:00Z'), // Future date 2
            time: '2:00 PM',
            spotsTotal: 8,
            spotsBooked: 2
          }
        ]
      }
    }
  })

  console.log('✅ Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })