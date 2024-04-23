export default {

    name: 'projectCategory',
    title: 'Project Category',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Category Name',
            type: 'string'
          },
          {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            // validation: Rule => Rule.required(),
            options: {
              source: 'name',
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
            title: 'Description', 
            name: 'cat_desc',
            type: 'array', 
            of: [{type: 'block'}]
          },
        
    ]
}