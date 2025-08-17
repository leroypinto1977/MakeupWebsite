import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      options: {
        list: [
          {title: 'Pink', value: '#f8bbd9'},
          {title: 'Purple', value: '#c084fc'},
          {title: 'Blue', value: '#60a5fa'},
          {title: 'Green', value: '#4ade80'},
          {title: 'Yellow', value: '#facc15'},
          {title: 'Orange', value: '#fb923c'},
          {title: 'Red', value: '#f87171'},
          {title: 'Gray', value: '#9ca3af'}
        ]
      }
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon name for the category'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
})
