import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Used in meta tags and social sharing'
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'email'
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2
        },
        {
          name: 'businessHours',
          title: 'Business Hours',
          type: 'text',
          rows: 3
        }
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url'
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url'
        },
        {
          name: 'pinterest',
          title: 'Pinterest',
          type: 'url'
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string'
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'ogImage',
          title: 'Default OG Image',
          type: 'image',
          description: 'Default image for social sharing'
        },
        {
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Without @ symbol'
        }
      ]
    }),
    defineField({
      name: 'googleAnalytics',
      title: 'Google Analytics ID',
      type: 'string',
      description: 'GA4 Measurement ID'
    }),
    defineField({
      name: 'calendlyUrl',
      title: 'Calendly URL',
      type: 'url',
      description: 'Your Calendly booking URL'
    }),
    defineField({
      name: 'notificationBar',
      title: 'Notification Bar',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Notification Bar',
          type: 'boolean'
        },
        {
          name: 'message',
          title: 'Message',
          type: 'string',
          hidden: ({parent}) => !parent?.enabled
        },
        {
          name: 'link',
          title: 'Link (optional)',
          type: 'url',
          hidden: ({parent}) => !parent?.enabled
        },
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              {title: 'Info', value: 'info'},
              {title: 'Success', value: 'success'},
              {title: 'Warning', value: 'warning'},
              {title: 'Announcement', value: 'announcement'}
            ]
          },
          hidden: ({parent}) => !parent?.enabled
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
})
