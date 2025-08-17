import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: () => '💄',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required().max(150)
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true}
      }]
    }),
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          {title: 'Bridal Makeup', value: 'bridal'},
          {title: 'Party Makeup', value: 'party'},
          {title: 'Editorial Makeup', value: 'editorial'},
          {title: 'Hair Styling', value: 'hair'},
          {title: 'Skincare Treatment', value: 'skincare'},
          {title: 'Makeup Lessons', value: 'lessons'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'basePrice',
          title: 'Starting Price',
          type: 'number'
        },
        {
          name: 'maxPrice',
          title: 'Maximum Price (optional)',
          type: 'number'
        },
        {
          name: 'priceNote',
          title: 'Pricing Note',
          type: 'string',
          description: 'e.g. "Starting from" or "Packages available"'
        }
      ]
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(15)
    }),
    defineField({
      name: 'includes',
      title: 'What\'s Included',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of items/services included'
    }),
    defineField({
      name: 'addOns',
      title: 'Available Add-ons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Add-on Name',
            type: 'string'
          },
          {
            name: 'price',
            title: 'Additional Price',
            type: 'number'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2
          }
        ]
      }]
    }),
    defineField({
      name: 'isPopular',
      title: 'Popular Service',
      type: 'boolean',
      description: 'Show "POPULAR" badge'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Display prominently on homepage'
    }),
    defineField({
      name: 'bookingNote',
      title: 'Booking Note',
      type: 'text',
      rows: 2,
      description: 'Special instructions or requirements'
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      category: 'category',
      price: 'pricing.basePrice'
    },
    prepare({title, media, category, price}) {
      return {
        title,
        subtitle: `${category} • $${price}`,
        media
      }
    }
  }
})
