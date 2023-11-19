import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className='text-lg font-medium	font-mono box-border bg-slate-200 min-h-screen	'>
        <main className='container w-3/5 mx-auto pt-[2rem]'>
          <Header/>
          <Outlet/>
        </main>
      </div>
  )
}

export default Layout
