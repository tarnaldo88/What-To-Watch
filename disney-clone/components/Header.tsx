import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <header>
        <Link href="/">
            <Image 
                src="https://w.wallhaven.cc/full/x6/wallhaven-x6wjkv.png"                
                className='cursor-pointer'
                alt="Disney Logo"
                width={120}
                height={100}
            />
        </Link>
        <div className='flex space-x-2'>
          
        </div>
    </header>
  )
}

export default Header