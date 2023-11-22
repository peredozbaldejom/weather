import Link from "next/link";

interface itPost {
    post: { 
        title: string,
        description: string
    }
}
export default async function Post({post} : itPost) {
    return (
        <div className="flex flex-col w-1/2 border border-bold border-gray-500 p-4 rounded-lg bg-gray-200">
            <h1 className="text-base font-bold text-gray-800">{post.title}</h1>
            <p className="text-base text-gray-700">{post.description}</p>
            <br />
            <Link href="/">BACK</Link>
        </div>
    )
}