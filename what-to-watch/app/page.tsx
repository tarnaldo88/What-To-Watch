import CarouselBannerWrapper from '@/components/CarouselBannerWrapper';
import MoviesCarousel from '@/components/MoviesCarousel';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getDiscoverMovies } from '@/lib/getMovies';

export default async function Home() {
  // Fetch existing carousel data
  const [
    upcomingMovies = [], 
    topRatedMovies = [], 
    popularMovies = [], 
    actionMovies = [], 
    dramaMovies = [], 
    horrorMovies = [],
    moreMovies = [],
    comedyMovies = [],
    scienceMovies = []
  ] = await Promise.all([
    getUpcomingMovies(),
    getTopRatedMovies(),
    getPopularMovies(),
    getDiscoverMovies('28'), // Action
    getDiscoverMovies('18'), // Drama
    getDiscoverMovies('27'), // Horror
    getDiscoverMovies('10749'), // Romance
    getDiscoverMovies('35'), // Comedy
    getDiscoverMovies('878'), // Science Fiction
  ]);

  // Ensure all movie arrays are defined before rendering
  const movieSections = [
    { movies: upcomingMovies, title: 'Upcoming' },
    { movies: popularMovies, title: 'Popular' },
    { movies: topRatedMovies, title: 'Top Rated' },
    { movies: comedyMovies, title: 'Comedy' },
    { movies: actionMovies, title: 'Action' },
    { movies: horrorMovies, title: 'Horror' },
    { movies: scienceMovies, title: 'Science Fiction' },
    { movies: dramaMovies, title: 'Drama' },
    { movies: moreMovies, title: 'Romance' },
  ].filter(section => section.movies && section.movies.length > 0);

  return (
    <main className="">
      <CarouselBannerWrapper />
      <div className='flex flex-col space-y-2 xl:mt-48'>
        {movieSections.map((section, index) => (
          <MoviesCarousel 
            key={`${section.title}-${index}`}
            movies={section.movies?.slice(0, 10) || []} 
            title={section.title} 
          />
        ))}
      </div>
    </main>
  );
}
