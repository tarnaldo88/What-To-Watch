import MoviesCarousel from '@/components/MoviesCarousel';
import { getPopularMovies, getSearchedMovies } from '@/lib/getMovies';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
   params:{ 
    term:string;
    };
};

async function SearchPage({params: {term}}: Props) { 
    if(!term) notFound();

    const termToUse = decodeURI(term);

    //API call to get the searched movies
    const movies = await getSearchedMovies(termToUse);

    //API call to get the popular movies
    const popularMovies = await getPopularMovies();

    return (
        <div className='max-w-7xl mx-auto'> 
            <div className='flex flex-col space-y-5 mt-32 xl:mt-42'> 
                <h1 className='text-6xl font-bold px-10'> Results for {termToUse}</h1>
                  <MoviesCarousel title="Movies" movies={movies} isVertical />
                  <MoviesCarousel title="You may also enjoy" movies={popularMovies} />  
            </div>  
        </div>
    );
}

export default SearchPage;