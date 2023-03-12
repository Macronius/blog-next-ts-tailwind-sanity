[](https://nextjs.org/docs/messages/experimental-app-dir-config)

[](https://heroicons.com)
[](https://github.com/tailwindlabs/heroicons)

[](https://www.sanity.io/docs/image-url)

[](https://www.npmjs.com/package/next-sanity#next-sanitypreview-live-real-time-preview)

[](https://tailwindcss.com/blog/multi-line-truncation-with-tailwindcss-line-clamp)

[](https://www.sanity.io/plugins)
[](https://www.sanity.io/plugins/iframe-pane) - structure.ts

[](https://www.npmjs.com/package/@portabletext/react)
[](https://www.npmjs.com/package/react-portable-text)
[](https://www.sanity.io/plugins/react-portable-text)

### to use tailwindcss: from styles > globals.css, import to the new layout.tsx

app > (admin)
app > (user)
NOTE: these do not affect the root
NOTE: the parenthesis negates the path
NOTE: these do not correlate to /admin and /user

Sanity Preview mode

## DEPENDENCIES

next-sanity
[](https://www.npmjs.com/package/next-sanity#next-sanitypreview-live-real-time-preview)

NOTE: preview mode and not preview mode
we have a nice toggle based on the api response, which can be paired with the specific thing that needs to be done, which will allow us to stream in data from sanity's backend before it is published

TODO: look up suspense boundaries

- export { PreviewSuspense as default } from 'next-sanity/preview'
- something about a temp patch until next-sanity supports next13 out of the box
- see Sonny's Next.js 13 video, where he explains this in detail

ACTION: 01:44:00
Objective is to turn each BlogList item into something clickable, that will take user to that article
Because of the way Next.js 13 works, you must consider whether it is a serverside or clientside component
In this case, it is a server component, which is based off of a dynamic prop
TODO: make a CLIENT SIDE HIGHER ORDER COMPONENT
Next.js is clever because it know that by separating the logic and passing the server component through as a prop, it knows what it can render as a client and what it cannot render as a client... it will handle this on its own.

### STATICALLY PRE-RENDER

re-render every 60 seconds, while user is on the page

### LESSON

Everytime I select a page to visit, it is indeed quite fast. this is because it is rendered from the server, thank to nextjs. (NOTE: what I just said <-- may or may not be completely correct)
The main issue to consider is that each time it is rendered from the server, a fetch is made from the sanity backend. This affects the overall alotted quota. If more than a lot of people are viewing this blog, it can really add up quickly.
Therefore, something must be done.

What will happen is I will write a function that will essentially fetch all of the post slugs, which will then be used

#### BUILD - Before Optimization

#### OPTIMIZATION

```javascript
export async function generateStaticParams() {
  const query = groq`*[_type == 'post'] {
       slug
   }`;
  //
  const slugs: Post[] = await client.fetch(query);
  //
  const slugRoutes = slugs.map((slug) => slug.slug.current);
  //
  return slugRoutes.map((slug) => ({
    slug,
  }));
}
```

#### BUILD - AFTER Optimization
