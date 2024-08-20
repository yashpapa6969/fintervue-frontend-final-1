import React from 'react'
import Navbar from '../job_display/navbar'
import Hero from '../job_display/hero'
import Footer from '../components/landing_page/footer'
import TopCompanies from '../job_display/topCompanies'
import CompanyList from '../job_display/CompanyList'

const DisplayPage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <TopCompanies/>
      <CompanyList/>
      <Footer/>
    </div>
  )
}

export default DisplayPage
