import Image from "next/image";
import { Star } from "lucide-react";


export default async function MovieDetailsPage({params }: {params: Promise<{ movie: string }>}) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  };
  const param = await params;
  const data = await fetch(`https://api.themoviedb.org/3/movie/${param.movie}`, options);
  const movie = await data.json();
  return (
    <div className="flex flex-col items-center gap-4 mx-auto max-w-3xl">
      <div className="flex flex-col gap-4 sm:flex-row border-b-2 px-6 pb-6">
        <Image
          priority
          className="mx-auto rounded-xl shadow-md shadow-black"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={325}
        />
        <div className="flex flex-col my-auto text-center sm:text-left gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">{movie.title}</h1>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Release Date</h2>
              <p>{movie.release_date}</p>
            </div>
            <div className="flex flex-col gap-2">
              
              <h2 className="font-semibold">Average Rating</h2>
              <div className="flex gap-1 justify-center sm:justify-start items-center">
                <Star size={14} fill="gold"  />
                <p className="tracking-widest">{movie.vote_average.toFixed(1)}</p>
              </div>
              
            </div>
            <div className="flex flex-col gap-2 w-3/4 sm:w-full mx-auto">
              <h2 className="font-semibold">Genres</h2>
              <div className="flex flex-wrap gap-2">
                <p>{movie.genres?.map((genre: { name: any; }) => genre.name).join(" / ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="flex flex-col gap-4 p-6">
            <h1 className="text-2xl text-center font-semibold">Overview</h1>
            { movie.overview ? (
                <p>{movie.overview}</p>
            ) : (
                <p className="text-center">No Overview Available</p>
            )}
        </div>
    </div>
  );
}
