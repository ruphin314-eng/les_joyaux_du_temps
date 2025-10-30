import React from 'react'
import Hero from '../components/Hero'
import LatestCollect from '../components/LatestCollect'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'

const Home = () => {
  return (
    <div>
       <Hero />
       <LatestCollect/>
       <BestSeller/>
       <OurPolicy/>
       <NewLetterBox/>
    </div>
  )
}

export default Home
