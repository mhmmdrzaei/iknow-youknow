import { defineConfig } from "sanity";
import {structureTool} from 'sanity/structure'


const config = defineConfig({
projectId: '4569xi28',
dataset: 'production',
title: 'I Know You Know',
apiVersion: '2024-04-19',
basePath: '/admin',
plugins: [structureTool()]

})

export default config;