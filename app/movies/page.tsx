"use client"
import SearchBar from "@/components/searchbar"
import { useMoviesContext } from "@/context/MoviesContext"
import Image from "next/image"
import Link from "next/link"
import Loading from "@/components/loading"

export default function MoviesPage() {
    let movies = useMoviesContext().movies

    if (!movies || movies.length === 0) {
        return (
            <Loading />
        )
    }

    return (
        <div className="flex-1 flex flex-col items-center gap-12">
            <h1 className="font-semibold text-3xl text-center">Movies</h1>
            <SearchBar />
            <div className="flex flex-wrap gap-10 justify-center">
                {movies.map((movie) => (
                    <Link href={`/moviedetails/${movie.id}`} key={movie.id} className="flex hover:scale-110 duration-300 flex-col gap-2 border border-zinc-500 rounded-lg w-48 shadow shadow-black">
                        <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} priority alt={movie.title} placeholder="empty" width={250} height={375} className="rounded-t-lg border-b" />
                        <h1 className="font-semibold text-center pb-2">{movie.title}</h1>
                    </Link>
                ))}
            </div>
        </div>
    )
}