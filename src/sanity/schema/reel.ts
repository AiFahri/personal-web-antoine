export const reel = {
  name: 'reel',
  title: 'Reel / Media',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (R:any)=>R.required() },
    { name: 'file', type: 'file', options: { accept: 'video/*,image/*' } },
    { name: 'thumbnail', type: 'image', options: { hotspot: true } },
    { name: 'posterSecond', type: 'number', title: 'Poster at second', initialValue: 1 },
    { name: 'link', type: 'url', title: 'Instagram/Reel Link' },
    { name: 'description', type: 'text' },
    { name: 'publishedAt', type: 'datetime' },
  ],
};






