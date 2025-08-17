import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Brief subtitle or tagline'
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200),
      description: 'Brief summary for blog cards and SEO'
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(60)
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {hotspot: true}
        },
        {
          name: 'tutorialStep',
          title: 'Tutorial Step',
          type: 'object',
          icon: () => '📋',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number'
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'image',
              title: 'Step Image',
              type: 'image',
              options: {hotspot: true}
            },
            {
              name: 'tips',
              title: 'Pro Tips',
              type: 'array',
              of: [{type: 'string'}]
            }
          ]
        },
        {
          name: 'productRecommendation',
          title: 'Product Recommendation',
          type: 'object',
          icon: () => '🛍️',
          fields: [
            {
              name: 'name',
              title: 'Product Name',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number'
            },
            {
              name: 'image',
              title: 'Product Image',
              type: 'image',
              options: {hotspot: true}
            },
            {
              name: 'affiliateLink',
              title: 'Affiliate Link',
              type: 'url'
            }
          ]
        },
        {
          name: 'beforeAfter',
          title: 'Before & After',
          type: 'object',
          icon: () => '↔️',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'beforeImage',
              title: 'Before Image',
              type: 'image',
              options: {hotspot: true}
            },
            {
              name: 'afterImage',
              title: 'After Image',
              type: 'image',
              options: {hotspot: true}
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            }
          ]
        },
        {
          name: 'calloutBox',
          title: 'Callout Box',
          type: 'object',
          icon: () => '💡',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Tip', value: 'tip'},
                  {title: 'Warning', value: 'warning'},
                  {title: 'Info', value: 'info'},
                  {title: 'Success', value: 'success'}
                ]
              }
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines (optional, defaults to main title)'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(160),
      description: 'Description for search engines'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Display as featured post on blog homepage'
    }),
    defineField({
      name: 'isNew',
      title: 'New Post',
      type: 'boolean',
      description: 'Show "NEW" badge on post cards'
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'}
        ]
      },
      initialValue: 'draft'
    })
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedDateDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      status: 'status'
    },
    prepare({title, author, media, status}) {
      return {
        title,
        subtitle: `by ${author} • ${status}`,
        media
      }
    }
  }
})
