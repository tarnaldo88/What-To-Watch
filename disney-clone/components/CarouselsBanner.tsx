import { Movie } from '@/typings';
import React from 'react';
import Image from 'next/image';
import getImagePath from '@/lib/getImagePath';
import  UseEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay";

type Props = {
    movies:Movie[];
}

function CarouselsBanner({movies}: Props) {
  return (
    <div>CarouselsBanner</div>
  )
}

export default CarouselsBanner