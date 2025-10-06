// ```typescript
import { SearchResults } from "@/typings";

async function fetchFromTMDB(url: URL, cacheTime?: number): Promise<SearchResults> {
    try {
        url.searchParams.set("include_adult", "true");
        url.searchParams.set("include_video", "true");
        url.searchParams.set("sort_by", "popularity.desc");
        url.searchParams.set("language", "en-US");
        url.searchParams.set("page", "1");

        const options: RequestInit = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
            next: {
                revalidate: cacheTime || 60 * 60 * 24, // 24hr default
            },
        };

        const response = await fetch(url.toString(), options);
        
        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status}`);
        }

        const data = (await response.json()) as SearchResults;
        return data || { results: [], page: 0, total_pages: 0, total_results: 0 };
    } catch (error) {
        console.error('Error fetching from TMDB:', error);
        return { results: [], page: 0, total_pages: 0, total_results: 0 };
    }
}

export async function getUpcomingMovies() {
    try {
        const url = new URL("https://api.themoviedb.org/3/movie/upcoming");
        const data = await fetchFromTMDB(url);
        return data?.results || [];
    } catch (error) {
        console.error('Error in getUpcomingMovies:', error);
        return [];
    }
}

export async function getTopRatedMovies() {
    try {
        const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
        const data = await fetchFromTMDB(url);
        return data?.results || [];
    } catch (error) {
        console.error('Error in getTopRatedMovies:', error);
        return [];
    }
}
  
  export async function getPopularMovies() {
    try {
        const url = new URL("https://api.themoviedb.org/3/movie/popular");
        const data = await fetchFromTMDB(url);
        return data?.results || [];
    } catch (error) {
        console.error('Error in getPopularMovies:', error);
        return [];
    }
}

  export async function getDiscoverMovies(id?: string, keywords?: string) {
    try {
        const url = new URL("https://api.themoviedb.org/3/discover/movie");

        if (keywords) url.searchParams.set("with_keywords", keywords);
        if (id) url.searchParams.set("with_genres", id);

        const data = await fetchFromTMDB(url);
        return data?.results || [];
    } catch (error) {
        console.error('Error in getDiscoverMovies:', error);
        return [];
    }
}

  export async function getSearchedMovies(term: string) {
    try {
        const url = new URL("https://api.themoviedb.org/3/search/movie");
        url.searchParams.set("query", term);
        const data = await fetchFromTMDB(url);
        return data?.results || [];
    } catch (error) {
        console.error('Error in getSearchedMovies:', error);
        return [];
    }
}