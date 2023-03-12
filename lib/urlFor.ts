import { client } from './sanity.client';
import imageUrlBuilder from '@sanity/image-url';

// Get a pre-configured url-builder from YOUR sanity client
// NOTE: imageUrlBuilder allows to return the value
const builder = imageUrlBuilder(client);

export default function urlFor(source: any) {
  return builder.image(source);
}
