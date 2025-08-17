import { sanityClient } from './lib/sanity.js'

// Test Sanity connection
async function testSanityConnection() {
  try {
    console.log('🔗 Testing Sanity connection...')
    
    // Test with a simple query to get the dataset info
    const result = await sanityClient.fetch(`*[0..0]`)
    console.log('✅ Sanity connection successful!')
    console.log('📊 First document:', result)
    
    // Test testimonials query specifically
    const testimonials = await sanityClient.fetch(`*[_type == "testimonial"]`)
    console.log('💬 Testimonials found:', testimonials.length)
    console.log('📋 Testimonials data:', testimonials)
    
  } catch (error) {
    console.error('❌ Sanity connection failed:', error)
  }
}

// Run the test
testSanityConnection()
