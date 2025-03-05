import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";





export default async function SearchResults( {
    params,
    searchParams,
    }: {
    params: { slug: string }
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        }
    };


    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;    
    const movie = (await searchParams).search;
    const results = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${movie}`, options);
    const data = await results.json();
    const movies = data.results;

    return (
        <main className=" pt-6 flex flex-col min-h-screen items-center">
            
            {movies && movies.length > 0 ? (
                
                <div>
                    <h1 className="page-title text-center font-semibold capitalize text-lg">{movie}</h1>
                    <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center mt-10">
                    {movies.map((movie: any) => (
                        <div key={movie.id} className="py-6 bg-zinc-100 shadow rounded-lg outline-dashed outline-2 outline-black shadow-black flex flex-col gap-2 w-64">
                            {movie.poster_path ? (
                                <Image 
                                priority
                                className="shadow-lg shadow-black mx-auto rounded-3xl"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                width={150} 
                                height={275} 
                                />
                            ) : (
                                <div className="text-center flex justify-center items-center min-h-[250px] w-full">
                                    <h1>No Poster Available</h1>
                                </div>
                            )}
                            
                            <Link href={`/moviedetails/${movie.id}`} className="hover:text-blue-600 hover:underline">
                                <h1 className="text-lg px-2 my-2 italic font-semibold text-center">{movie.title}</h1>
                            </Link>
                            { movie.overview ? (
                                <p className="line-clamp-5 overflow-ellipsis px-4">
                                    {movie.overview}
                                </p>
                            ) : (
                                <h1 className="text-center">No Overview Available</h1>
                            )
                            }
                            
                            <div className="flex justify-center mt-auto">
                                <Link href={`/moviedetails/${movie.id}`} className="flex hover:underline items-center p-2">
                                    <h1>Find Out More</h1>
                                    <ArrowBigRight fill="black" />
                                </Link>
                                
                            </div>
                        </div>
                        ))}
                    </div>
                </div>)
                : (
                    
                    <h1 className="mt-10 text-center text-xl">No results found</h1>
                )}
            

        </main>
    )
}