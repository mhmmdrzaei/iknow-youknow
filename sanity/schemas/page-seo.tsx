export default {
    name: 'seo',
    title: 'Page SEO',
    type: 'object',
    fields: [
      {
        name: 'title',
        title: 'Page Title',
        type: 'string'
      },
      {
        name:'description',
        title: 'description',
        description: '100-150 characters NOT MORE',
        type:'text'
      },
      {
        title: 'SEO  Image',
        name: 'seo_image',
        type: 'file',
        description: '1200 x 628 pixels'
      },

      
    ]
  }