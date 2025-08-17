import { createClient } from '@sanity/client'

// Create and export the Sanity client
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true, // Use CDN now that dataset is public
  ignoreBrowserTokenWarning: true,
  perspective: 'published', // Only fetch published documents
})

// Helper function to build image URLs
export const urlFor = (source) => {
  if (!source?.asset?._ref) {
    return ''
  }
  
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
  const dataset = import.meta.env.VITE_SANITY_DATASET
  
  // Extract image ID from asset reference
  const imageId = source.asset._ref.replace('image-', '').replace('-webp', '.webp').replace('-jpg', '.jpg').replace('-png', '.png')
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}`
}

// Common GROQ queries
export const queries = {
  // Get all testimonials (show all testimonials for now, we can filter later)
  testimonials: `*[_type == "testimonial"] | order(rating desc) {
    _id,
    clientName,
    title,
    testimonialText,
    rating,
    showOnHomepage
  }`,
  
  // Get all blog posts with preview
  blogPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    isFeatured,
    readingTime,
    author->{
      name,
      bio,
      image
    },
    categories[]->{
      title,
      slug
    },
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`,
  
  // Get featured blog posts
  featuredBlogPosts: `*[_type == "blogPost" && isFeatured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    author->{
      name,
      bio,
      image
    },
    categories[]->{
      title,
      slug
    },
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`,
  
  // Get single blog post by slug
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    publishedAt,
    readingTime,
    seoTitle,
    seoDescription,
    author->{
      name,
      bio,
      image,
      social
    },
    categories[]->{
      title,
      slug,
      description
    },
    tags,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`,
  
  // Get all categories
  categories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`,
  
  // Get all services
  services: `*[_type == "service"] | order(orderRank asc) {
    _id,
    title,
    description,
    price,
    duration,
    category,
    isPopular,
    orderRank,
    image {
      asset->{
        _id,
        url
      },
      alt
    }
  }`
}

// Helper functions for data fetching
export const fetchTestimonials = async () => {
  try {
    console.log('🔍 Fetching testimonials with query:', queries.testimonials);
    console.log('🔧 Client config:', {
      projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
      dataset: import.meta.env.VITE_SANITY_DATASET,
      apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
    });
    
    const testimonials = await sanityClient.fetch(queries.testimonials)
    console.log('📊 Testimonials from Sanity:', testimonials);
    return testimonials
  } catch (error) {
    console.error('❌ Error fetching testimonials:', error)
    return []
  }
}

export const fetchBlogPosts = async () => {
  try {
    const posts = await sanityClient.fetch(queries.blogPosts)
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const fetchFeaturedBlogPosts = async () => {
  try {
    const posts = await sanityClient.fetch(queries.featuredBlogPosts)
    return posts
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

export const fetchBlogPostBySlug = async (slug) => {
  try {
    const post = await sanityClient.fetch(queries.blogPostBySlug, { slug })
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export const fetchCategories = async () => {
  try {
    const categories = await sanityClient.fetch(queries.categories)
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const fetchServices = async () => {
  try {
    const services = await sanityClient.fetch(queries.services)
    return services
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}
