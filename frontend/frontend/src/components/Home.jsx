import React from 'react'
import {
    Hero,
    About,
    Feedbacks
  } from ".";

const Home = () => {
  return (
    <div>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center w-full h-[900px] bg-fixed">
          {/* <Navbar /> */}
          <Hero />
        </div>
        <About />
        <Feedbacks />
      </div>
    </div>
  )
}

export default Home
