import CarouselBannerWrapper from '@/components/CarouselBannerWrapper';
import MoviesCarousel from '@/components/MoviesCarousel';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getDiscoverMovies } from '@/lib/getMovies';

export default async function Home() {
  // Fetch existing carousel data
  const [upcomingMovies, topRatedMovies, popularMovies, actionMovies, dramaMovies, horrorMovies, moreMovies, comedyMovies, scienceMovies] = await Promise.all([
    getUpcomingMovies(),
    getTopRatedMovies(),
    getPopularMovies(),
    getDiscoverMovies('28'), // Action
    getDiscoverMovies('18'), // Drama
    getDiscoverMovies('27'),  // Horror
    getDiscoverMovies('10749'), //testing
    getDiscoverMovies('35'), //comedy
    getDiscoverMovies('878'), //science
  ]);

  return (
    <main className="">
      <CarouselBannerWrapper />
      <div className='flex flex-col space-y-2 xl:mt-48'>
        <MoviesCarousel movies={upcomingMovies} title="Upcoming" />
        <MoviesCarousel movies={popularMovies} title="Popular" />
        <MoviesCarousel movies={topRatedMovies} title="Top Rated" />
        <MoviesCarousel movies={comedyMovies} title="Comedy" />
        
        {/* Genre Sections */}
        <MoviesCarousel 
          movies={actionMovies} 
          title="Action" 
        />        
        <MoviesCarousel 
          movies={horrorMovies} 
          title="Horror"
        />        
        <MoviesCarousel
          movies={comedyMovies}
          title="Comedies"
        />
        <MoviesCarousel
          movies={scienceMovies}
          title="Science Fiction"
        />
        <MoviesCarousel 
          movies={dramaMovies} 
          title="Drama" 
        />
        <MoviesCarousel
          movies={moreMovies}
          title="Liebesfilm"
        />
      </div>
    </main>
  );
}
