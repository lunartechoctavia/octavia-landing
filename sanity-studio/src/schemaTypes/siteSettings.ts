import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Editorial settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Blog title', type: 'string', initialValue: 'Octavia Blog', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Blog description', type: 'text', rows: 3}),
    defineField({name: 'siteUrl', title: 'Production site URL', type: 'url'}),
    defineField({name: 'articlesPerPage', title: 'Articles per page', type: 'number', initialValue: 10, validation: (rule) => rule.required().integer().min(6).max(12)}),
  ],
  preview: {prepare: () => ({title: 'Editorial settings'})},
})
