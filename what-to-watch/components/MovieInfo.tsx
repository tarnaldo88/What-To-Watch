import React from 'react';
import { Movie } from '@/typings';
import MovieCard from './MovieCard';
import { cn } from '@/lib/utils';

// TextBox that displays information of the movie, to be used for when mouseover a tile

type Props = {
    title?: string;
    movies: Movie[];
    isVertical?: boolean;
};

// function MovieInfo({title, movies }: Props) {
//   return (
//     { movies.map(movie => (
//         <div>
//             <div className="max-w-2xl">
            
//                 <p className="font-bold">
//                 {movie.title} ({movie.release_date?.split("-")[0]})
//                 </p>
//                 <hr className="mb-3" />
//                 <p className="">{movie.overview}</p>
//             </div>  
//         </div>
//     ))}
//   )
// }

// export default MovieInfo