import React from 'react'
import Navbar from '../job_display/navbar'
import Hero from '../job_display/hero'
import Footer from '../components/landing_page/footer'
import TopCompanies from '../job_display/topCompanies'
// import CompanyList from '../job_display/CompanyList'
// import JobRoleCard from '../job_display/CompanyList'
import JobRoleList from '../job_display/JobRoleList'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const DisplayPage = () => {
  const user= useAuthUser()
  return (
    <div>
      <Navbar />
      {user.uid}
      <Hero />
      <TopCompanies />
      {/* <CompanyList/> */}
      <JobRoleList />
      <Footer />
    </div>
  );
}

export default DisplayPage
