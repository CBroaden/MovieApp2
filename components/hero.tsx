'use client'
import React, { useContext, CSSProperties } from "react";
import Image from 'next/image';
import { useMoviesContext } from "@/context/MoviesContext";
import Link from "next/link";

export default function Header() {
  const { movies } = useMoviesContext();

  if (!movies || movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 items-center ">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="font-bold text-2xl">MovieX</h1>
        <h2 className="font-semibold text-lg">A Movie Based Social Media</h2>
        <h3 className="text-sm">Powered by Next.js and Supabase</h3>
        <Link href={`/moviedetails/${movies[0].id}`} className="flex flex-col gap-4 justify-center items-center w-full md:w-3/5  p-6">

          <Image className="isolate aspect-video w-96 rounded-xl shadow-md" alt={(movies[0].title)+" Backdrop"} src={`https://image.tmdb.org/t/p/w500${movies[0].backdrop_path}`} width={500} height={400}/>
          <h1 className="font-bold text-2xl">{movies[0].title}</h1>
          <p className="  rounded-lg mx-auto">
            {movies[0].overview}
          </p>

        </Link>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}