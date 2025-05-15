import React, { Children } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gray-900">
      <div className="bg-gray-900">
          <nav className="bg-gray-800 px-6 py-4 shadow​ flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white">Search...</Link>
            <div className='flex gap-4 items-center'>
              <NavLink to="/" className={({isActive}) => isActive ? "text-blue-500 p-2" : "text-white p-2"}>Home</NavLink>
              <NavLink to="/ingredients" className={({isActive}) => isActive ? "text-blue-500 p-2" : "text-white p-2"}>Ingredients</NavLink>
            </div>
          </nav>
      </div>
    </header>
  )
}

export default Header
