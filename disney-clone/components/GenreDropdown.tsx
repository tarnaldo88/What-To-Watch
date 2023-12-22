import { Genres } from '@/typings';
import React from 'react'
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

async function GenreDropdown() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

    const options:RequestInit = {
        method:"GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        },
        next:{
            revalidate: 60 * 60 *24, //24hrs
        }
    };

    const response = await fetch(url, options);
    const data = (await response.json()) as Genres;

    console.log(data);

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='text-white flex justify-center'>
            <ChevronDown/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Select Genre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {data.genres.map((genre) => (
                <DropdownMenuItem key={genre.id}>
                    <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
                        {genre.name}
                    </Link>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>  
  )
}

export default GenreDropdown