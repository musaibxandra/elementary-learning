'use client';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { navbarLinks } from '@/constants';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-white shadow-sm border-b w-full'>
      <nav className='w-full px-4 sm:px-6 lg:px-8 py-3'>
        <div className='flex items-center justify-between max-w-7xl mx-auto w-full'>
          {/* Logo */}
          <Link href="/" className='flex cursor-pointer gap-2 items-center flex-shrink-0'>
            <Image
              src="/icons/logo.jpg"
              alt="Style logo"
              width={65}
              height={65}
              className='w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain'
            />
            <span className='text-base sm:text-lg font-bold whitespace-nowrap'>Rehab Sharif Learning</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-6'>
            {navbarLinks.map((item) => (
              <Link 
                href={item.route} 
                key={item.label}
                className='cursor-pointer hover:underline text-sm font-medium transition-colors'
              >
                {item.label}
              </Link>
            ))}
            <Link href="/login">
              <Button className='ml-4 cursor-pointer text-sm px-4 py-2'>
                <span>Login</span>
              </Button>
            </Link>
            <Link href="/signup">
              <Button className='cursor-pointer text-sm px-4 py-2'>
                <span>Sign Up</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Image
                src="/icons/hamburger.svg"
                alt="Menu Icon"
                width={24}
                height={24}
                className='cursor-pointer'
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='lg:hidden border-t mt-3 pt-4 pb-4'>
            <div className='flex flex-col space-y-4 px-4'>
              {navbarLinks.map((item) => (
                <Link 
                  href={item.route} 
                  key={item.label}
                  onClick={() => setIsMenuOpen(false)}
                  className='cursor-pointer hover:underline text-base font-medium py-2 transition-colors'
                >
                  {item.label}
                </Link>
              ))}
              <div className='flex flex-col gap-3 pt-2'>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className='w-full cursor-pointer text-sm py-2'>
                    <span>Login</span>
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className='w-full cursor-pointer text-sm py-2'>
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
