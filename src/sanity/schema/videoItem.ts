export const videoItem = {
  name: 'videoItem',
  title: 'Gallery Video',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (R:any)=>R.required() },
    { name: 'video', title: 'Video', type: 'file', options: { accept: 'video/*' }, validation: (R:any)=>R.required() },
    { name: 'thumbnail', title: 'Optional Thumbnail', type: 'image', options: { hotspot: true } },
    { name: 'posterSecond', title: 'Poster at second', type: 'number', initialValue: 1 },
    { name: 'publishedAt', type: 'datetime' },
  ],
};
