import PostForm from "@/components/postform";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Clapperboard, CircleUserRound, InfoIcon, Clock } from "lucide-react";
import Link from "next/link";




export default async function FeedPage() {
    type Post = {
        id: string;
        movie: string;
        text: string;
        created_at: string;
        user_id: string;
        users: { username: string } | null; // Single object or null
      };

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    
    const {data : username} = await supabase.from('users').select('username').eq('id', user?.id).single();
    
    //console.log(username);
    const { data: posts } = await supabase.from('posts').select(`id, movie, text, created_at, user_id, users!inner(username)`).order('created_at', { ascending: false }) as { data: Post[] | null };
    
    if (!posts) {
        return (
            <div className="flex-1 flex flex-col items-center gap-6">
                <h1 className="font-semibold text-xl text-center">No Posts Available</h1>
            </div>
        );
    }

    const formatDate = (isoString: string | number | Date) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat("en-US", {
          year: "2-digit",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(date);
      };
    return (
        <div className="flex-1 flex flex-col items-center gap-6">
            <div>
                <h1 className="font-semibold text-xl text-center">Feed</h1>
                <h2 className="font-light text-sm mb-4">Read and create posts about movies</h2>
            </div>
            
            {user ? (
                <PostForm username={username?.username}/>
            ) : 
            (
                <div className="bg-accent border text-sm p-3 px-5 rounded-md text-foreground flex gap-3 justify-center items-center">
                    <InfoIcon size="16" strokeWidth={2} />
                    Posts can only be created by authenticated users
                    <Link href="/sign-up" className="">
                        <Button className="bg-primary  h-8 rounded-md hover:bg-accent hover:text-black shadow-sm shadow-black animate-in duration-300">Sign Up</Button>
                    </Link>
                    
                </div>
            )
            }
            
            {posts?.map((post) => (
                <div key={post.id} className="p-4 flex flex-col gap-2 border rounded-lg w-full bg-accent">
                    <h1 className="flex items-center gap-1 font-medium text-lg"><Clapperboard size={16}/>{post.movie}</h1>
                    <p className="">{post.text}</p>
                    <div className="flex mt-2 items-center w-full">
                        <p className="flex gap-1 items-center text-gray-600 text-sm "><CircleUserRound size={13}/>{post.users?.username || "Unknown User"}</p>
                        <h2 className="flex gap-1 items-center mr-4 text-xs ml-auto text-gray-600 "><Clock size={12} />{formatDate(post.created_at)}</h2>
                    </div>
                </div>
            ))}
        </div>             
        
    );
}