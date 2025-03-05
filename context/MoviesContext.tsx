"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import discoverMovies from "@/app/functions/discoverMovies";

interface Movie {
  id: number;
  overview: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

interface MoviesContextProps {
  movies: Movie[];
}

const MoviesContext = createContext<MoviesContextProps | undefined>(undefined);

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, options);
      const movieJson = await movieData.json();
      const movieResults = await movieJson.results;
      console.log("Movie Results =", movieJson);
      setMovies(movieResults);
    };

    fetchMovies();
  }, []);

  return (
    <MoviesContext.Provider value={{ movies }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMoviesContext() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMoviesContext must be used within a MoviesProvider");
  }
  return context;
}