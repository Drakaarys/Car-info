import React from 'react'
import Featured from '../components/Features'
import Hero from '../components/Hero'
import Categories from '../components/categories'
import LandingSearch from '../components/LandingSearch'
import CTA from '../components/Cta'

const landing = () => {
  return (
    <div className='relative min-h-screen w-screen overflox-x-hidden'>
      <Hero />
      <Featured />
      <Categories />
      <LandingSearch />
      <CTA />
    </div>
  )
}

export default landing
