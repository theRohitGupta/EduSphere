import React from 'react'
import Navbar from '../components/common/Navbar'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const { loading : authLoading } = useSelector( (state) => state.auth);
    const { loading : profileLoading } = useSelector( (state) => state.profile)

    if( authLoading || profileLoading ) return (<Spinner/>)
  return (
    <div>
      <div className=' relative'>
        <Navbar backgroundColor={1}/>
      </div>
      <div className='flex pt-[50px]'>
          <div className=' relative w-[15%]'>
            <Sidebar/>
          </div>
          <div className=' w-[85%] pt-[40px] relative'>
              <div className=' mx-auto w-11/12'>
                  <Outlet/>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard