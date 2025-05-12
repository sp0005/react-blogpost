import React from 'react'
import Home from './Home'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Dasgboarad = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  )
}

export default Dasgboarad