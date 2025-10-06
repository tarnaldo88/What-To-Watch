"use client"
import { Movie } from '@/typings';
import React, { useState } from 'react';
import Image from 'next/image';
import getImagePath from '@/lib/getImagePath';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from "embla-carousel-autoplay";
import MovieImagesModal from './MovieImagesModal';

type Props = {
    movies:Movie[];
}

Autoplay.globalOptions= {delay: 8000};

function CarouselsBanner({movies}: Props) {
    const [emblaRef] = useEmblaCarousel({loop: true, duration: 100}, [Autoplay()]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Movie | null>(null);

  return (
    <div ref={emblaRef} className='overflow-hidden lg:-mt-40 relative cursor-pointer'>        
        <div className='flex'>
            {movies.map(movie => (
                <div
                    key={movie.id}
                    className='flex-full min-w-0 relative'
                    onClick={() => { setSelected(movie); setOpen(true); }}
                >
                    <Image 
                        key={movie.id}
                        src={getImagePath(movie.backdrop_path, true)}
                        alt=""
                        width={1920}
                        height={1080}
                    />    
                    <div className='hidden lg:inline absolute mt-0 top-0 
                        pt-40 xl:pt-52 left-0 lg:mt-40 bg-transparent z-20 
                        h-full w-full p-10 space-y-5' style={{
                            // background: 'linear-gradient(to right, rgba(185, 28, 28, 0.9) 0%, rgba(185, 28, 28, 0.7) 0%, transparent 100%)'
                        }}>
                        <h2 className='text-5xl font-bold max-w-xl z-50'>
                            {movie.title}
                        </h2>
                        <p className='max-w-xl line-clamp-3'>{movie.overview}</p>
                    </div>
                </div>
            ))}
        </div>
        <div 
            className='pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/25
            to-gray-300 dark:to-[#8f0314]'
        />
        <MovieImagesModal movie={selected} open={open} onClose={() => setOpen(false)} initialIndex={null} />
    </div>
  )
}

export default CarouselsBanner