'use client';
// convert to a client side component because we need to know if the user is mounted

import { usePreview } from '../lib/sanity.preview';
import BlogList from './BlogList';

type Props = {
  query: string;
};

export default function PreviewBlogList({ query }: Props) {
  // use usePreview hook to get all posts, published and staged (in progress)
  // first param is token, no need for authentication
  const posts = usePreview(null, query);

  return <BlogList posts={posts} />;
}

// essentially an abstraction wrapper for the preview-mode
