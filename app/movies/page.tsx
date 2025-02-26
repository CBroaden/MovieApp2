"use client"
import { useMoviesContext } from "@/context/MoviesContext"
import Image from "next/image"
import Link from "next/link"

export default function MoviesPage() {
    let movies = useMoviesContext().movies
    return (
        <div className="flex-1 flex flex-col gap-12">
            <h1 className="font-semibold text-3xl text-center">Movies</h1>
            <div className="flex flex-wrap gap-10 justify-center">
                {movies.map((movie) => (
                    <div key={movie.id} className="flex flex-col gap-2 border border-zinc-500 rounded-lg w-48 shadow shadow-black">
                        <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} priority alt={movie.title} placeholder="empty" width={250} height={375} className="rounded-t-lg border-b" />
                        <h1 className="font-semibold text-center pb-2">{movie.title}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}