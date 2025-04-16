import Hero from "@/components/hero";
import SearchBar from "@/components/searchbar";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <Hero />
      <div className="flex flex-col gap-2 items-center mx-auto">
        <h1 className="font-bold text-xl">Find Movies</h1>
        <SearchBar />
      </div>
      
    </main>
  );
}
