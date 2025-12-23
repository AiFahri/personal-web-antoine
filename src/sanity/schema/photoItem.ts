export const photoItem = {
  name: 'photoItem',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (R:any)=>R.required() },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (R:any)=>R.required() },
    { name: 'publishedAt', type: 'datetime' },
  ],
};
