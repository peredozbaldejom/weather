import Link from "next/link"
import { getPosts } from "../lib/actions"

interface Post {
    id: number | string,
    title?: string,
    description: string
}

interface PostsProps {
    posts: {
      products: Post[];
    };
  }

export default async function Posts() {
    const posts = await getPosts() 
    return (
        <div>
            {posts.products.map((post : Post) => (
                <div key={post.id} className="flex flex-col w-1/2 border border-bold border-gray-500 p-4 rounded-lg bg-gray-200">
                    <h1 className="text-base font-bold text-gray-800">{post.title}</h1>
                    <p className="text-base text-gray-700">{post.description}</p>
                    <Link href={`/post/${post.id}`}>Detail</Link>
                </div>)
            )}
        </div>
    )
}