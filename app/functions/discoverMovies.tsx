export default async function discoverMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const movieResults = data.results;
    console.log("Movie Results =", movieResults);
    return movieResults;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
}