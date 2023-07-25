import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

// <a href="https://www.freepik.com/free-vector/hand-drawn-community-spirit-illustration_38477296.htm#query=collaboration&position=29&from_view=search&track=sph">Freepik</a>
// <a href="https://www.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-bright-vibrant-violet-isolated-illustration_10780698.htm#query=collaboration&position=36&from_view=search&track=sph">Image by vectorjuice</a> on Freepik

export const Home:React.FC = () => {
  return(
    <div className='Home'>
      <Navbar/>
      <div className='Body'>
        <div className='Text'>
          <h1>We Encourage Collaboration</h1>
          <h2>A Medium to trade notes in different classes</h2>
          <div className='Start'><Link to='/login'>Get Started</Link></div>
          
        </div>
        <a className='SVG' href="https://www.freepik.com/free-vector/hand-drawn-community-spirit-illustration_38477296.htm#query=collaboration&position=29&from_view=search&track=sph">
        </a>
      </div>
    </div>
  )
}

const Navbar:React.FC = () => {
  return(
    <div className='Navbar'>
      <div className='Logo'>
        <div className='PNG'></div>
      </div>
      <div className='Title'>NoteHub</div>
      <div className='Launch'><Link to='/login'>Launch App</Link></div>
    </div>
  )
}