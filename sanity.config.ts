import { defineConfig } from "sanity";
import {structureTool} from 'sanity/structure';
import {media} from 'sanity-plugin-media';
import { myStructure } from "./sanity/structure";
import {schemaTypes} from './sanity/schemas'
import {visionTool} from '@sanity/vision';


const config = defineConfig({
projectId: '4569xi28',
dataset: 'production',
title: 'I Know You Know',
apiVersion: '2024-04-19',
basePath: '/admin',
plugins: [structureTool({structure:myStructure}),media(),visionTool()],
schema: {
  types: schemaTypes,
},

})

export default config;