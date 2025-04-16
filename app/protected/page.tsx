import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import PostForm from "@/components/postform";
import SearchBar from "@/components/searchbar";
import Hero from "@/components/hero";

export default async function ProtectedPage() {
  const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return redirect("/sign-in");
}

const {data : username} = await supabase.from('users').select('username').eq('id', user.id).single();

console.log(username);
console.log(user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">

      <Hero />

      

      <div className="w-full">
        <div className="flex flex-col gap-1 w-full justify-center items-center">
          <div >
            <h1 className="font-bold text-3xl mb-2">Welcome {username?.username}, To MovieX</h1>
            <h2 className="font-medium text-lg mb-4">A Movie Based Social Media</h2>
          </div>
          
          <SearchBar />
          <PostForm username={username?.username}/>

        </div>
        
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 justify-center items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      
    </div>
  );
}
