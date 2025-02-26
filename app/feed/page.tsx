import { createClient } from "@/utils/supabase/server";




export default async function FeedPage() {
    const supabase = await createClient();

    const { data: posts } = await supabase.from('posts').select('*, user_id(username)').order('created_at', { ascending: false });

    return (
        <div className="flex-1 flex flex-col gap-12">
            {posts?.map((post) => (
                <div key={post.id} className="p-4 flex flex-col gap-2 border rounded-lg w-full">
                    <h1 className="font-bold">{post.movie}</h1>
                    <p className="">{post.text} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni deleniti perspiciatis soluta alias earum autem laudantium dolores minus! Quisquam, ex.</p>
                    <h2 className="mx-4 text-right ">@{post.user_id.username}</h2>
                </div>
            ))}
        </div>             
        
    );
}