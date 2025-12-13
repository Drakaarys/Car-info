import React from 'react'
import Hero from './components/hero'
import Featured from './components/Features'

const App = () => {
  return (
    <div className='relative min-h-screen w-screen overflox-x-hidden'>
      <Hero />
      <Featured />
    </div>
  )
}

export default App
