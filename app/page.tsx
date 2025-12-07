import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Sessions from '@/components/Sessions'
import HowItWorks from '@/components/Steps'
import React from 'react'

const pageLayout = () => {
  return (
    <main className='w-full min-w-0 overflow-x-hidden'>
      <Header />
      <HowItWorks />
      <Sessions />
    </main>
  )
}

export default pageLayout
