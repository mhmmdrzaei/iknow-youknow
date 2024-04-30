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
        title: 'Hero Image Desktop',
        name: 'herovisual',
        description: 'a normal size file please, nothing bigger than 5mb',
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
            
        ]
      },
      {
        title: 'Hero Image Mobile',
        name: 'herovisualMobile',
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
            
        ]
      },
      {
        name: 'seo',
        title: 'SEO info',
        type: 'seo'
      }


      
    ]
  }