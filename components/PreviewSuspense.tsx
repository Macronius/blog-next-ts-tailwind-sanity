'use client';

// Once rollup supports 'use client' module directives, then 'next-sanity' will include them and this re-export will no longer be necessary

// manually have the use client tell it is a server component wrapper
export { PreviewSuspense as default } from 'next-sanity/preview';
