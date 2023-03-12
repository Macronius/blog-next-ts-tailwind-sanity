import { previewData } from 'next/headers';
import { groq } from 'next-sanity';
import PreviewSuspense from '../../components/PreviewSuspense';
import PreviewBlogList from '../../components/PreviewBlogList';
import BlogList from '../../components/BlogList';
import { client } from '../../lib/sanity.client';

export const revalidate = 86400;

const query = groq`
  *[_type == 'post'] {
    ...,
    author->,
    categories[]->,
  } | order(_createdAt desc)
`;

export default async function HomePage() {
  // if in preview mode - cannot proceed
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            <p className="text-center text-lg animate-pulse text-[#F7AB0A]">
              Loading Preview Data...
            </p>
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  // not in preview mode - proceed
  const posts = await client.fetch(query);
  // console.log('server-console log: ', posts);
  return <BlogList posts={posts} />;
}
