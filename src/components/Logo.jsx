import React from 'react'
import nbaLogo from '../assets/images/nba-logo.png'

const Logo = () => {
  return (
    <div className='logo w-15 h-15'>
        <img src={nbaLogo} alt='NBA logo' className='w-full h-full object-contain'/>
    </div>
  )
}

export default Logo