import seo from './page-seo'

export default {
    name: 'siteSettings',
    title: 'Site Info',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Site Title',
        type: 'string'
      },
      {
        title: 'Site Logo',
        name: 'site_log',
        type: 'file',
        
      },

           {
        title: 'Hero Image / Video',
        name: 'herovisual',
        description: 'a normal size file please, nothing bigger than 5mb for video',
        type: 'array',
        of:[
            {
              title: 'Hero Image',
              name: 'hero_image',
              type: 'image',
              options: {
                hotspot: true // <-- Defaults to false
              },
              fields: [
                {
                  name: 'attribution',
                  type: 'string',
                  title: 'Alt',
                }
              ]
            },
            {
              title: 'Hero Video',
              name: 'hero_video',
              type: 'file',
  
            }
        ]
      },
      {
        title: 'Identity', 
        name: 'identity',
        type: 'array', 
        of: [{type: 'block'}]
      },
      {
        title: 'Motion', 
        name: 'motion',
        type: 'array', 
        of: [{type: 'block'}]
      },
      {
        title: 'Spaces', 
        name: 'spaces',
        type: 'array', 
        of: [{type: 'block'}]
      },
      {
        name: 'seo',
        title: 'SEO info',
        type: 'seo'
      }


      
    ]
  }