export default {
    name: 'singleProject',
    title: 'Projects',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Project Name',
        type: 'string'
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        // validation: Rule => Rule.required(),
        options: {
          source: 'title',
          maxLength: 200, // will be ignored if slugify is set
          validation: (Rule: { required: () => any; }) => Rule.required(),
        }
      },
      {
        title: 'Sort Order',
        name: 'sort',
        type: 'number',
      },
      {
        title: 'Visibility',
        name: 'visible',
        type: 'boolean',
        initialValue: true
        // validation: Rule => Rule.required()
      },
      {
        title: 'Password (if Applicable)',
        name: 'password',
        type: 'string',
        description: 'The password page will appear only if this is filled out. if empty it will go to project as usual.'

      },
      {
        name: 'projectdescription',
        title: 'Project Description',
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
        name:'projectDate',
        title: 'Project Date', 
        type: 'string'
      },
      {
        name: 'clientName',
        title: 'Client Name',
        type: 'string'
      },
      {
        name:'shortProjectDescription',
        title: 'Short Project Description', 
        type: 'text'
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: {type: 'projectCategory'},
      },
      {
        title: 'Credits',
        name: 'creditsProject',
        type: 'array',
        of: [
          {
            type: 'credits'
            
          }
          
        ]    
      },
      {
        title: 'Hero Image / Video',
        name: 'projectHerovisual',
        description: 'add a video, or hero image or mobile image if needed',
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
  
            },
            {
              title: 'Mobile Image',
              name: 'mobile_image',
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
            }
        ]
      },

      {
        title: 'Project Assets',
        name: 'projectImages',
        type: 'array',
        of:[

            {
              title: 'Project Image',
              name: 'projectImage',
              type: 'image',
              options: {
                hotspot: true // <-- Defaults to false
              },
              fields: [
                {
                  name: 'attribution',
                  type: 'string',
                  title: 'Alt',
                },
                {
                  name: 'width',
                  type: 'string',
                  title: 'Width % (only number, do not include %)',
                }
              ]
            },
            {
              title: 'Project Video',
              name: 'project_video',
              type: 'file',
              fields: [
                {
                    name: 'attribution',
                    type: 'string',
                    title: 'Alt',
                  },
                  {
                    name: 'width',
                    type: 'string',
                    title: 'Width % (only number, do not include %)',
                  }
              ]
            }, 
            {
              title: 'Project Text', 
              name: 'projectText',
              type: 'object', 
              fields: [
                {name: 'text', type: 'text'
              , title: 'Project Text'},
              {
                name: 'width',
                type: 'string',
                title: 'Width % (only number, do not include %)',
              }
              ]
            },
            {
              title: 'External Video Links', 
              name: 'externalVideo',
              type: 'object', 
              fields: [
                {name: 'exVidURL', type: 'string'
              , title: 'Video URL'},
              {
                name: 'width',
                type: 'string',
                title: 'Width % (only number, do not include %)',
              }
              ]
            }


        ]
      },
      {
        name: 'seo_project',
    title: 'Page SEO',
    type: 'object',
    fields: [
      {
        name:'description',
        title: 'description',
        description: '100-150 characters NOT MORE',
        type:'text'
      },
      {
        title: 'SEO  Image --if different from default',
        name: 'seo_image',
        type: 'file',
        description: '1200 x 628 pixels'
      },

      
    ]
      }

      
    ]
  }