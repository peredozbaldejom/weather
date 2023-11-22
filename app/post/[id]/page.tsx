import Post from "@/app/ui/post";
import { getPost } from "@/app/lib/actions"
interface Params {
    params: { 
        id: string
    }
}

export default async function PagePost({ params: { id }} : Params) {
    const data = await getPost(id)
    return (
        <Post post={data} />
    )
}