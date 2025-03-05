import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"


export default function SearchBar() {

    return (
        <div className=" h-12 p-1">
            <form className="flex md:max-w-md w-full" action='/search'>
                <Input type="text" placeholder="Search Movies..." name="search" className=" rounded-r-none shadow shadow-zinc-700"></Input>
                <button type="submit" className="shadow shadow-zinc-700  border rounded-l-none rounded-lg bg-accent text-foreground p-2">
                    <Search size={16} className="mx-auto" />
                </button>
            </form>
        </div>
    )
}