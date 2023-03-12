import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { myTheme } from './theme';
import StudioNavbar from './components/StudioNavbar';
import Logo from './components/Logo';
import { getDefaultDocumentNode } from './structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: '/studio', // base path - where I will render it on the website
  name: 'Comtrya_Content_Studio',
  title: 'Comtrya Content Studio',
  projectId,
  dataset,

  plugins: [
    deskTool({
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    visionTool(),
  ],
  // deskTool() allows to update the information (in real time)
  // visionTool() allows to test the GROQ queries on the backend

  schema: {
    types: schemaTypes,
  },

  theme: myTheme,
  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
  },
});
