import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const previewBase = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:8080'

export default defineConfig({
  name: 'octavia-editorial',
  title: 'Octavia Editorial',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool({defaultApiVersion: '2026-03-01'})],
  schema: {types: schemaTypes},
  document: {
    productionUrl: async (prev, context) => {
      if (context.document?._type !== 'post') return prev
      const slug = (context.document.slug as {current?: string} | undefined)?.current
      return slug ? `${previewBase}/blog/${slug}` : `${previewBase}/blog`
    },
  },
})
