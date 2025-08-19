import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'transformation',
  title: 'Transformation',
  type: 'document',
  icon: () => '✨',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Bridal', value: 'Bridal' },
          { title: 'Party', value: 'Party' },
          { title: 'Evening', value: 'Evening' },
          { title: 'Natural', value: 'Natural' },
          { title: 'Glam', value: 'Glam' },
          { title: 'Photoshoot', value: 'Photoshoot' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image', 
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'Optional - client name for attribution'
    }),
    defineField({
      name: 'makeupProducts',
      title: 'Makeup Products Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'List of makeup products/brands used'
    }),
    defineField({
      name: 'techniques',
      title: 'Techniques Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Makeup techniques applied (e.g., contouring, highlighting)'
    }),
    defineField({
      name: 'occasion',
      title: 'Occasion',
      type: 'string',
      description: 'Specific occasion or event type'
    }),
    defineField({
      name: 'duration',
      title: 'Application Duration',
      type: 'string',
      description: 'How long the makeup application took'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Transformation',
      type: 'boolean',
      description: 'Display prominently on homepage'
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Include in homepage gallery'
    }),
    defineField({
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers first)'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'afterImage',
      featured: 'isFeatured'
    },
    prepare({title, subtitle, media, featured}) {
      return {
        title,
        subtitle: `${subtitle} ${featured ? '⭐ Featured' : ''}`,
        media
      }
    }
  }
})
