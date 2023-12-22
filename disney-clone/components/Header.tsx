import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { ThemeToggler } from './ThemeToggler'

function Header() {
  return (
    <header className='fixed w-full z-20 top-0 flex items-center justify-between
      p-5 bg-gradient-to-t from-gray-200/0 via-gray-900/25'>
        <Link className='mr-10' href="/">
            <Image 
                src="https://w.wallhaven.cc/full/x6/wallhaven-x6wjkv.png"                
                className='cursor-pointer'
                alt="Disney Logo"
                width={120}
                height={100}
            />
        </Link>
        <div className='flex space-x-2'>
         <ThemeToggler/>
        </div>
    </header>
  )
}

export default Header