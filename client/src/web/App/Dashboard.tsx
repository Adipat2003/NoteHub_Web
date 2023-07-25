import React from 'react'
import './dashboard.css'
import { PiFinnTheHumanLight, PiChatTeardropTextLight, PiHexagonLight } from 'react-icons/pi'
import { BsArrowReturnRight, BsBookmarkDash } from 'react-icons/bs'
import { CiBellOn } from 'react-icons/ci'
import { BsPlusLg } from 'react-icons/bs'
import { Feed } from './Dashboard_Components/Feed/Feed'
import { displayProps } from './Interface'
import { useState, useContext, useEffect } from 'react'
import { UserContext, UserContextType } from '../../App'
import { Logout } from './Dashboard_Components/Widgets/Logout'
import { LiaStickyNoteSolid } from 'react-icons/lia'
import { useNavigate } from 'react-router-dom'
import { CREATE_NOTES } from './Dashboard_Components/Add_Note/Create_Notes'
import { Settings } from './Dashboard_Components/Settings/Settings'
import { Chats } from './Dashboard_Components/Chats/Chats'
import { USER_NOTES } from './Dashboard_Components/Notes/User_Notes'
import { Notification } from './Dashboard_Components/Notification/Notifications'
import { Saved } from './Dashboard_Components/Save/Saved'

export const Dashboard:React.FC = () => {

  const [display, setDisplay] = useState('feed')
  const { currentUserData } = useContext<UserContextType>(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserData.Username === '') {
      navigate('/login')
    }
  }, [currentUserData.Username, navigate])

  return(
    <div className='Dashboard'>
      <DASHBOARD_LOGO/>
      <DASHBOARD_NAVBAR changeDisplay={(val: string) => { setDisplay(val) }}/>
      <DASHBOARD_SIDEBAR changeDisplay={(val: string) => { setDisplay(val) }}/>
      <div className='Dashboard_Main_Content'>
        { display === 'feed' ? <Feed/> : <></> }
        { display === 'notes' ? <USER_NOTES/> : <></> }
        { display === 'saved' ? <Saved/> : <></> }
        { display === 'chat' ? <Chats/> : <></> }
        { display === 'notification' ? <Notification/> : <></> }
        { display === 'account' ? <Settings/> : <></> }
        { display === 'addNote' ? <CREATE_NOTES/> : <></> }
      </div>
    </div>
  )
}

export const DASHBOARD_LOGO:React.FC = () => {
  return(
    <div className='Dashboard_Logo'>
      <div className='Dashboard_Logo_Image'></div>
      <h1>NoteHub</h1>
    </div>
  )
}

export const DASHBOARD_NAVBAR:React.FC<displayProps> = ({changeDisplay}) => {

  const { currentUserData } = useContext<UserContextType>(UserContext)
  const [dropdown, setDropdown] = useState(false);
  const [input, setInput] = useState('')

  const search = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(input)
  }

  return(
    <div className='Dashboard_Navbar'>
      <form className='Dashboard_Searchbar' onSubmit={ search }>
        <input className='Navbar_Search' placeholder='Search NoteHub' type='text' onChange={(e) => { setInput(e.target.value) }}/>
        <button><BsArrowReturnRight className='Search_Arrow'/></button>
      </form>
      <div className='Navbar_Buttons'>
        <div className='Navbar_Icons'>
          <button className='Add_Note' onClick={() => { changeDisplay('chat') }}><PiChatTeardropTextLight style={{ fontSize: '25px', transform: 'translateY(2px)'  }}/></button>
          <button className='Add_Note' onClick={() => { changeDisplay('notification') }}><CiBellOn style={{ fontSize: '25px', transform: 'translateY(2px)'  }}/></button>
          <button className='Add_Note' onClick={() => { changeDisplay('addNote') }}><BsPlusLg style={{ fontSize: '25px', transform: 'translateY(2px)'  }}/></button>
        </div>
        <div className='Welcome'>
          <h1>Welcome, {currentUserData.Username}</h1>
          <button className='Profile_Image' onClick={() => { setDropdown(!dropdown) }}></button>
        </div>
        {
          dropdown ? <Logout/> : <></>
        }
      </div>
    </div>
  )
}

const DASHBOARD_SIDEBAR:React.FC<displayProps> = ({changeDisplay}) => {

  return (
    <div className='Dashboard_Sidebar'>
      <div className='Sidebar_Header'>
        <p>Menu</p>
      </div>
      <div className='Sidebar_Options'>
        <button onClick={() => {changeDisplay('feed')}}><PiFinnTheHumanLight className='Sidebar_Icon'/> Home</button>
        <button onClick={() => {changeDisplay('notes')}}><LiaStickyNoteSolid className='Sidebar_Icon'/> Your Notes</button>
        <button onClick={() => {changeDisplay('saved')}}><BsBookmarkDash className='Sidebar_Icon'/> Saved</button>
        <button onClick={() => {changeDisplay('chat')}}><PiChatTeardropTextLight className='Sidebar_Icon'/> Chat</button>
        <button onClick={() => {changeDisplay('notifications')}}><CiBellOn className='Sidebar_Icon'/> Notification</button>
        <button onClick={() => {changeDisplay('account')}}><PiHexagonLight className='Sidebar_Icon'/> Account</button>
      </div>
    </div>
  )
}