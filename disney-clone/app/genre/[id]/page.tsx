import React from 'react';
import { notFound } from 'next/navigation';

type Props = {
    params:{ 
     id:string;
     };
     searchParams: {
        genre: string;
     }
 };

function GenrePage({params: {id}, searchParams: {genre}}: Props) {
    if(!id) notFound();

    const idToUse = decodeURI(id);
  return (
    <div> Genre: {idToUse}</div>
  )
}

export default GenrePage