const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: 'hi0vf116',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN, // Set this in your .env file
  apiVersion: '2024-01-01'
});

const sampleTransformations = [
  {
    _type: 'transformation',
    title: 'Classic Bridal Elegance',
    description: 'Timeless bridal makeup with soft, romantic tones and natural enhancement',
    category: 'bridal',
    beforeImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-1' // You'll need to upload actual images
      },
      alt: 'Before makeup - natural look'
    },
    afterImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-2' // You'll need to upload actual images
      },
      alt: 'After makeup - classic bridal look'
    },
    clientName: 'Sarah M.',
    featured: true,
    displayOrder: 1,
    tags: ['bridal', 'classic', 'elegant', 'natural']
  },
  {
    _type: 'transformation',
    title: 'Bold Evening Glam',
    description: 'Dramatic smokey eyes with bold contouring for a glamorous evening look',
    category: 'party',
    beforeImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-3'
      },
      alt: 'Before makeup - casual daytime look'
    },
    afterImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-4'
      },
      alt: 'After makeup - bold evening glam'
    },
    clientName: 'Jessica L.',
    featured: true,
    displayOrder: 2,
    tags: ['party', 'bold', 'dramatic', 'evening']
  },
  {
    _type: 'transformation',
    title: 'Soft Romantic Bridal',
    description: 'Delicate pink tones with subtle highlighting for a dreamy bridal appearance',
    category: 'bridal',
    beforeImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-5'
      },
      alt: 'Before makeup - minimal makeup'
    },
    afterImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-6'
      },
      alt: 'After makeup - soft romantic bridal'
    },
    clientName: 'Emily R.',
    featured: true,
    displayOrder: 3,
    tags: ['bridal', 'romantic', 'soft', 'pink']
  },
  {
    _type: 'transformation',
    title: 'Modern Chic Party Look',
    description: 'Contemporary makeup with clean lines and sophisticated color palette',
    category: 'party',
    beforeImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-7'
      },
      alt: 'Before makeup - everyday look'
    },
    afterImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-8'
      },
      alt: 'After makeup - modern chic party look'
    },
    clientName: 'Amanda K.',
    featured: false,
    displayOrder: 4,
    tags: ['party', 'modern', 'chic', 'contemporary']
  },
  {
    _type: 'transformation',
    title: 'Boho Wedding Style',
    description: 'Effortless bohemian bridal look with earthy tones and natural textures',
    category: 'bridal',
    beforeImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-9'
      },
      alt: 'Before makeup - natural bare face'
    },
    afterImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-10'
      },
      alt: 'After makeup - boho wedding style'
    },
    clientName: 'Mia S.',
    featured: false,
    displayOrder: 5,
    tags: ['bridal', 'boho', 'natural', 'earthy']
  },
  {
    _type: 'transformation',
    title: 'Corporate Elegance',
    description: 'Professional yet polished look perfect for business events and networking',
    category: 'professional',
    beforeImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-11'
      },
      alt: 'Before makeup - minimal professional look'
    },
    afterImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-12'
      },
      alt: 'After makeup - corporate elegance'
    },
    clientName: 'Rachel P.',
    featured: false,
    displayOrder: 6,
    tags: ['professional', 'corporate', 'polished', 'elegant']
  }
];

async function createTransformations() {
  try {
    console.log('Creating sample transformations...');
    
    for (const transformation of sampleTransformations) {
      const result = await client.create(transformation);
      console.log(`Created transformation: ${result.title} (ID: ${result._id})`);
    }
    
    console.log('✅ All sample transformations created successfully!');
    console.log('\n📝 Note: You need to:');
    console.log('1. Upload actual images to Sanity Studio');
    console.log('2. Update the image references in the created documents');
    console.log('3. The fallback images will display until then');
    
  } catch (error) {
    console.error('❌ Error creating transformations:', error);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  createTransformations();
}

module.exports = { createTransformations, sampleTransformations };
