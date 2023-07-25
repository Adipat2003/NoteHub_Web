import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './web/App/Dashboard';
import { Home } from './web/Home/Home';
import { Form } from './web/Authentication/Login';
import { createContext, useState } from 'react'
import './App.css';

export type UserData = {
  Username: string, 
  Password: string, 
  Email: string
}

export type UserContextType = {
  currentUserData: UserData
  setCurrentUserData: React.Dispatch<React.SetStateAction<UserData>>
}

export const UserContext = createContext<UserContextType>({
  currentUserData: {
    Username: '',
    Password: '',
    Email: ''
  },
  setCurrentUserData: () => {}
});

function App() {

  const [currentUserData, setCurrentUserData] = useState({Username: '', Password: '', Email: ''})

  return (
      <UserContext.Provider value={{currentUserData, setCurrentUserData}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Home/> }/> 
            <Route path='/login' element={ <Form/> }/> 
            <Route path='/app' element={ <Dashboard/> }/> 
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
