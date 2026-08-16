import {defineArrayMember, defineField, defineType} from 'sanity'

function portableTextWordCount(value: unknown): number {
  if (!Array.isArray(value)) return 0
  const text = value
    .filter((block) => block && typeof block === 'object' && (block as {_type?: string})._type === 'block')
    .flatMap((block) => ((block as {children?: Array<{text?: string}>}).children || []).map((child) => child.text || ''))
    .join(' ')
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export const post = defineType({
  name: 'post',
  title: 'Article',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content', validation: (rule) => rule.required().max(90)}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'publishing',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 4, group: 'content', validation: (rule) => rule.required().min(120).max(360)}),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}], group: 'publishing', validation: (rule) => rule.required()}),
    defineField({name: 'category', title: 'Category', type: 'reference', to: [{type: 'category'}], group: 'publishing', validation: (rule) => rule.required()}),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime', group: 'publishing', validation: (rule) => rule.required()}),
    defineField({name: 'updatedAt', title: 'Updated at', type: 'datetime', group: 'publishing'}),
    defineField({name: 'featured', title: 'Featured article', type: 'boolean', group: 'publishing', initialValue: false}),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
      ],
    }),
    defineField({
      name: 'fallbackImage',
      title: 'Local fallback image path',
      type: 'string',
      group: 'content',
      description: 'Used by the deterministic local seed before a Sanity image is uploaded.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
      validation: (rule) =>
        rule.required().custom((value) => {
          const words = portableTextWordCount(value)
          return words >= 2000 || `Long-form articles must contain at least 2,000 words. Current count: ${words}.`
        }),
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related articles',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'reference', to: [{type: 'post'}]})],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({name: 'seo', title: 'Search and social', type: 'seo', group: 'seo', validation: (rule) => rule.required()}),
  ],
  orderings: [
    {title: 'Publication date, newest', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', author: 'author.name', category: 'category.name', media: 'heroImage'},
    prepare: ({title, author, category, media}) => ({title, subtitle: [category, author].filter(Boolean).join(' · '), media}),
  },
})
