import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'clientImage',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'title',
      title: 'Title/Role',
      type: 'string',
      description: 'e.g. Bride, Mother of the Bride'
    }),
    defineField({
      name: 'testimonialText',
      title: 'Testimonial',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [1, 2, 3, 4, 5]
      }
    }),
    defineField({
      name: 'serviceUsed',
      title: 'Service Used',
      type: 'reference',
      to: [{type: 'service'}]
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'date'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Wedding venue or city'
    }),
    defineField({
      name: 'beforeAfterImages',
      title: 'Before & After Images',
      type: 'object',
      fields: [
        {
          name: 'before',
          title: 'Before Image',
          type: 'image',
          options: {hotspot: true}
        },
        {
          name: 'after',
          title: 'After Image',
          type: 'image',
          options: {hotspot: true}
        }
      ]
    }),
    defineField({
      name: 'isVideo',
      title: 'Video Testimonial',
      type: 'boolean',
      description: 'Is this a video testimonial?'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video URL',
      hidden: ({document}) => !document?.isVideo
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Display prominently on homepage'
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Keywords for filtering testimonials'
    })
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'title',
      media: 'clientImage',
      rating: 'rating'
    },
    prepare({title, subtitle, media, rating}) {
      const stars = '★'.repeat(rating || 0)
      return {
        title,
        subtitle: `${subtitle} • ${stars}`,
        media
      }
    }
  }
})
