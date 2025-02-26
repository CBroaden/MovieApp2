'use client'
import { useContext } from "react";
import Image from 'next/image';
import { useMoviesContext } from "@/context/MoviesContext";

export default function Header() {
  const { movies } = useMoviesContext();

  if (!movies || movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="font-bold text-2xl">MovieX</h1>
        <h2 className="font-semibold text-lg">A Movie Based Social Media</h2>
        <h3 className="text-sm">Powered by Next.js and Supabase</h3>
        <p>{movies[0].overview}</p>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}