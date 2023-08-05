import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate  } from 'react-router-dom'
import { style1, style2, style3 } from './Button_Style'
import { PiArrowUpLeftBold, PiArrowUpRightBold } from 'react-icons/pi'
import { UserProperties, LoginProps, RegisterProps } from '../App/Interface'
import { UserContext, UserContextType } from '../Context/AuthenticationContext'
import { Eye } from './EyeLogic'
import './login.css'
import './eye.css'


export const Form:React.FC = () => {

  const [users, setUsers] = useState<UserProperties[]>([])

  useEffect(() => {
    getUsers()
  }, [])

  let getUsers = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/get-users/')
    let data = await response.json()
    setUsers(data)
  }

  const [form, setForm] = useState('login')
  const [button_style, set_buttonStyle] = useState(style1)
  const [button_arrow, set_buttonArrow] = useState(<PiArrowUpLeftBold style={style3}/>)

  const swap_form = () => {
    form === 'login' ? setForm('register') : setForm('login')
    form === 'login' ? set_buttonStyle(style2) : set_buttonStyle(style1)
    form === 'login' ? set_buttonArrow(<PiArrowUpRightBold style={style3}/>) : set_buttonArrow(<PiArrowUpLeftBold style={style3}/>)
  }

  return(
    <div className='Outer_Container'>
      <div className='Parent_Container'>
        <div className='Form_Headers'>
          <div className='Login_Header'>Login</div>
          <div className='Register_Header'>Register</div>
        </div>
        <button className='Form_Swap' onClick={swap_form}>
          <div className='Circle' style={button_style}>{button_arrow}</div>
        </button>
        {
          form === 'login' ? <Login userInfo={users}/> : <Register userInfo={users}/>
        }
      </div>
    </div>
  )
}

const Login:React.FC<LoginProps> = ({userInfo}) => {

  const { setCurrentUserData } = useContext<UserContextType>(UserContext)

  const [isValidAccount, setIsValidAccount] = useState<boolean>(true)
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const login = (e: React.FormEvent) => {
    e.preventDefault()

    if (userInfo.some(obj => obj.Username === loginUsername && obj.Password === loginPassword)) {

      const user = userInfo.find(obj => obj.Username === loginUsername && obj.Password === loginPassword)

      if (user !== null && user !== undefined) {
        const data = { Username: loginUsername, Email: user.Email, Password: loginPassword }
        setCurrentUserData(data)
        navigate('/app')
      }
    } else {
      setIsValidAccount(false)
    }
  }

  return (
    <form className='Login' onSubmit={ login }>
      <Eye/>
      <h1>Login</h1>
      <input type='text' placeholder='username' onChange={(e) => {setLoginUsername(e.target.value)}}/>
      <input type='password' placeholder='password' onChange={(e) => {setLoginPassword(e.target.value)}}/>
      <button>Login</button>
      <p className={isValidAccount ? 'Login_Notification_Hidden' : 'Login_Notification'}>Account Not Registered</p>
    </form>
  )
}

const Register:React.FC<RegisterProps> = ({userInfo}) => {

  const { setCurrentUserData } = useContext<UserContextType>(UserContext)

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [isValidUsername, setIsValidUsername] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const navigate = useNavigate();

  const register = async    (e: React.FormEvent) => {
    e.preventDefault()

    if (userInfo.some(obj => obj.Username === registerUsername && obj.Email === registerEmail)) {
      setIsValidUsername(false)
      setIsValidEmail(false)
    } else if (userInfo.some(obj => obj.Username === registerUsername)) {
      setIsValidUsername(false)
      setIsValidEmail(true)
    } else if (userInfo.some(obj => obj.Email === registerEmail)) {
      setIsValidEmail(false)
      setIsValidUsername(true)
    } else {
      let id = ''
      for (var i = 0; i < 10; i++) {
        let i = Math.floor(Math.random() * 10);
        let choice = Math.floor(Math.random() * 2);
        let string = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        choice === 0 ? id += i.toString() : id += string
      }

      const data = {
        Username: registerUsername,
        Email: registerEmail,
        Password: registerPassword,
        Id: id
      }

      setCurrentUserData(data)

      fetch('http://127.0.0.1:8000/api/create-user/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      navigate('/app')
    }
  }

  return (
    <form className='Register' onSubmit={ register }>
      <Eye/>
      <h1>Register</h1>
      <input type='text' placeholder='username' onChange={(e) => {setRegisterUsername(e.target.value)}}/>
      <input type='email' placeholder='email' onChange={(e) => {setRegisterEmail(e.target.value)}}/>
      <input type='password' placeholder='password' onChange={(e) => {setRegisterPassword(e.target.value)}}/>
      <button>Register</button>
      <p className={isValidUsername ? (isValidEmail ? 'Login_Notification_Hidden' : 'Login_Notification') : 'Login_Notification'}>
        {isValidUsername ? (isValidEmail ? '' : 'Email Already Registered') : (isValidEmail ? 'Username Already Exists' : 'Account Already Registered')}
      </p>
    </form>
  )
}
