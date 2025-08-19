import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Vyara Beauty Blog',

  projectId: 'hi0vf116',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  cors: {
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:4028',
      'https://vibisha.vercel.app',
      /^https:\/\/.*\.vercel\.app$/,
    ],
  },
})
