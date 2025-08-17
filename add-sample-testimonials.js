import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: 'hi0vf116',
  dataset: 'production',
  apiVersion: '2024-08-17',
  token: process.env.SANITY_WRITE_TOKEN || '', // You'll need a write token
  useCdn: false
})

// Sample testimonials data
const sampleTestimonials = [
  {
    _type: 'testimonial',
    clientName: 'Sarah Johnson',
    title: 'Bride',
    testimonialText: 'The trial and wedding day experience were flawless. My makeup felt lightweight yet stayed perfect through tears and dancing. I felt like the most beautiful version of myself!',
    rating: 5,
    location: 'Beverly Hills, CA',
    showOnHomepage: true,
    isFeatured: true,
    tags: ['bridal', 'wedding', 'makeup']
  },
  {
    _type: 'testimonial',
    clientName: 'Emily Rodriguez',
    title: 'Bridesmaid',
    testimonialText: 'As a bridesmaid at three different weddings with Vyara, I\'ve seen consistent quality, care, and artistry every single time! Highly recommend.',
    rating: 5,
    location: 'Los Angeles, CA',
    showOnHomepage: true,
    isFeatured: false,
    tags: ['bridesmaid', 'wedding', 'makeup']
  },
  {
    _type: 'testimonial',
    clientName: 'Jessica Lee',
    title: 'Bride',
    testimonialText: 'The skincare prep advice alone was worth it. My skin has never looked this radiant in photos—timeless and natural. Thank you for making my day perfect!',
    rating: 5,
    location: 'Santa Monica, CA',
    showOnHomepage: true,
    isFeatured: false,
    tags: ['bridal', 'skincare', 'photography']
  },
  {
    _type: 'testimonial',
    clientName: 'Amanda Thompson',
    title: 'Bride',
    testimonialText: 'Professional, punctual, and calm under pressure. They elevated not just my look—but my confidence for the entire day. Absolutely magical experience!',
    rating: 5,
    location: 'Malibu, CA',
    showOnHomepage: true,
    isFeatured: false,
    tags: ['bridal', 'professional', 'confidence']
  },
  {
    _type: 'testimonial',
    clientName: 'Rachel Martinez',
    title: 'Client',
    testimonialText: 'Every recommendation—from foundation to lip color—was spot on. Everything photographed beautifully without feeling heavy. Best makeup artist in LA!',
    rating: 5,
    location: 'West Hollywood, CA',
    showOnHomepage: true,
    isFeatured: false,
    tags: ['makeup', 'photography', 'recommendations']
  },
  {
    _type: 'testimonial',
    clientName: 'Isabella Chen',
    title: 'Bride',
    testimonialText: 'They understood my vision instantly and delivered a look that felt authentically me—enhanced, not masked. I felt radiant and confident all day long.',
    rating: 5,
    location: 'Pasadena, CA',
    showOnHomepage: true,
    isFeatured: false,
    tags: ['bridal', 'natural', 'authentic']
  }
]

// Function to add testimonials
async function addTestimonials() {
  try {
    console.log('🚀 Adding sample testimonials to Sanity...')
    
    const transaction = client.transaction()
    
    sampleTestimonials.forEach(testimonial => {
      transaction.create(testimonial)
    })
    
    const result = await transaction.commit()
    console.log('✅ Successfully added testimonials:', result)
    
  } catch (error) {
    console.error('❌ Error adding testimonials:', error)
  }
}

// Run the function if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addTestimonials()
}

export { addTestimonials }
