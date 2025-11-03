import React from 'react'
import Logo from './Logo'

const Header = () => {

  return (
    <div className="flex items-center gap-3">
      <Logo />
      <h1 className="text-white text-2xl font-bold">NBA Stats 2025</h1>
    </div>
  )

  
}

export default Header
