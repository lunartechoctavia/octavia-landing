import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Search and social',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Aim for 50–60 characters.',
      validation: (rule) => rule.required().max(65),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(100).max(160),
    }),
    defineField({name: 'focusKeyword', title: 'Focus keyword', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'canonicalUrl', title: 'Canonical override', type: 'url'}),
    defineField({
      name: 'socialImage',
      title: 'Social image override',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
    }),
    defineField({name: 'noIndex', title: 'Exclude from search engines', type: 'boolean', initialValue: false}),
  ],
})
