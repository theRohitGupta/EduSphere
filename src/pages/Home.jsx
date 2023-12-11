import React from 'react'
import HomePageSection1 from '../components/core/HomePage/HomePageSection1'
import HomePageSection2 from '../components/core/HomePage/HomePageSection2'
import HomePageSection3 from '../components/core/HomePage/HomePageSection3'
import Footer from '../components/common/Footer'
import Navbar from '../components/common/Navbar'

function Home() {
  return (
    <div>
        {/* NAVBAR */}
        <Navbar backgroundColor={1}/>
    
        {/* SECTION 1 */}
        <HomePageSection1/>

        {/* SECTION 2 */}
        <HomePageSection2/>

        {/* SECTION 3 */}
        <HomePageSection3/>

        {/* FOOTER */}
        <Footer/>

    </div>
  )
}

export default Home

