import CarouselBannerWrapper from '@/components/CarouselBannerWrapper';
import MoviesCarousel from '@/components/MoviesCarousel'
import { Button } from '@/components/ui/button'
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/getMovies';
import Image from 'next/image'


export default async function Home() {

  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();
  return (
    <main className="">
      <h1></h1>
      <CarouselBannerWrapper/>
      <div className='flex flex-col space-y-2 xl:mt-48'>
        <MoviesCarousel movies={upcomingMovies} title="Upcoming" />
        <MoviesCarousel movies={popularMovies} title="Popular" />
        <MoviesCarousel movies={topRatedMovies} title="Top Rated" />
      </div>
    </main>
  )
}
