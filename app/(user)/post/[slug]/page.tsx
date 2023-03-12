import { groq } from 'next-sanity';
import Image from 'next/image';
import { client } from '../../../../lib/sanity.client';
import urlFor from '../../../../lib/urlFor';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../../../../components/RichTextComponents';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 864000; // revalidate this page every 60 seconds

/** OPTIMIZATION - MINIMIZE SANITY FETCHING */
export async function generateStaticParams() {
  const query = groq`*[_type == 'post'] {
        slug
    }`;
  //
  const slugs: Post[] = await client.fetch(query);
  //   console.log('slugs:', slugs);
  //
  const slugRoutes = slugs.map((slug) => slug.slug.current);
  console.log('slugRoutes: ', slugRoutes);
  //
  return slugRoutes.map((slug) => ({
    slug,
  }));
}

/** SERVER COMPONENT */
export default async function Post({ params: { slug } }: Props) {
  // groq query
  const query = groq`
        *[_type == 'post' && slug.current == $slug][0]
        {
            ...,
            author->,
            categories[]->,
        }
    `;

  const post: Post = await client.fetch(query, { slug });

  //   console.log(post);

  // return
  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#F7AB0A] text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>

          <section className="p-5 bg-[#F7AB0A] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex space-x-2 items-center">
                <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                />
                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <div>{/* TODO: Author's bio */}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {post.categories.map((category) => (
                  <p
                    key={category._id}
                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
}
