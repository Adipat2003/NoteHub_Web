import React from 'react'
import { useNavigate } from 'react-router'
import './logout.css'

export const Logout:React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className='Dropdown'>
      <button className='Logout' onClick={() => { navigate('/') }}>Logout</button>
      <button className='Account'>Account</button>
    </div>
  )
}

