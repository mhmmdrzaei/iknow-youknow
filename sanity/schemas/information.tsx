import social from './social'


export default {
    name: 'information',
    title: 'Office',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Page Title',
        type: 'string'
      },
      {
        name:'url',
        title: 'slug',
        type: 'slug',
      },
      {
        name: 'information',
        title: 'Information',
        type: 'array', 
         of: [{type: 'block',
         marks: {
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'External link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL'
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  type: 'boolean'
                }
              ]
            },
          ]
        },
        
        }]
      },
      {
        name: 'services_office',
        title: 'Services',
        type: 'array', 
         of: [{type: 'block',
         marks: {
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'External link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL'
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  type: 'boolean'
                }
              ]
            },
          ]
        },
        
        }]
      },
  
      {
        title: 'Contact',
        name: 'contactInfo',
        type: 'array',
        of: [
          {
            type: 'contact'
            
          }
          
        ]    
      },
      {
        title: 'Social',
        name: 'socialInfo',
        type: 'array',
        of: [
          {
            type: 'social'
            
          }
          
        ]    
      }


      
    ]
  }