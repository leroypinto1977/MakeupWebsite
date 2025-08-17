import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolioImage',
  title: 'Portfolio Image',
  type: 'document',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Bridal Makeup', value: 'bridal'},
          {title: 'Party Makeup', value: 'party'},
          {title: 'Editorial', value: 'editorial'},
          {title: 'Hair Styling', value: 'hair'},
          {title: 'Before & After', value: 'beforeafter'},
          {title: 'Behind the Scenes', value: 'bts'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string'
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Wedding', value: 'wedding'},
          {title: 'Engagement', value: 'engagement'},
          {title: 'Reception', value: 'reception'},
          {title: 'Party', value: 'party'},
          {title: 'Photoshoot', value: 'photoshoot'},
          {title: 'Other', value: 'other'}
        ]
      }
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'date'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string'
    }),
    defineField({
      name: 'makeupStyle',
      title: 'Makeup Style',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Natural Glam', value: 'natural'},
          {title: 'Bold Glam', value: 'bold'},
          {title: 'Smokey Eye', value: 'smokey'},
          {title: 'Classic', value: 'classic'},
          {title: 'Modern', value: 'modern'},
          {title: 'Traditional Indian', value: 'traditional'},
          {title: 'Destination Wedding', value: 'destination'}
        ]
      }
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Image',
      type: 'boolean',
      description: 'Display prominently in galleries'
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean'
    }),
    defineField({
      name: 'photographer',
      title: 'Photographer Credit',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    })
  ],
  orderings: [
    {
      title: 'Event Date, New',
      name: 'eventDateDesc',
      by: [
        {field: 'eventDate', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
      client: 'client'
    },
    prepare({title, media, category, client}) {
      return {
        title,
        subtitle: client ? `${category} • ${client}` : category,
        media
      }
    }
  }
})
