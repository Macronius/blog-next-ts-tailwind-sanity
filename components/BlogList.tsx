// framework
import Image from 'next/image';
// utilities
import urlFor from '../lib/urlFor';
// dependencies
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import ClientSideRoute from './ClientSideRoute';

type Props = {
  posts: Post[];
};

export default function BlogList({ posts }: Props) {
  return (
    <div>
      <hr className="border-[#F7AB0A] mb-10" />

      <div className="grid gird-cols-1 md:grid-cols-2 px-10 gap-x-10 gap-y-16 pb-24">
        {posts.map((post) => (
          <ClientSideRoute key={post._id} route={`/post/${post.slug.current}`}>
            {/* ?debug: was {post.slug.current} */}

            <div className="flex flex-col group cursor-pointer">
              <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                <Image
                  className="object-cover object-left lg:object-center"
                  src={urlFor(post.mainImage).url()}
                  alt={post.author.name}
                  fill
                />
                <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between">
                  {/* left side */}
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p>
                      {new Date(post._createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {/* right side */}
                  <div className="flex flex-col md:flex-row gap-y-2 gap-x-2 items-center">
                    {post.categories.map((category, i) => (
                      <div
                        key={i}
                        className="bg-[#F7AB0A] text-center text-black px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex-1">
                <p className="underline text-lg font-bold">{post.title}</p>
                <p className="text-gray-500 line-clamp-2">
                  {post.description || post.categories[0].description}
                </p>
              </div>

              {/* read post */}
              <p
                className="
                mt-5
                font-bold
                flex
                items-center
                group-hover:underline"
              >
                Read Post
                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
              </p>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
}
