import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './web/App/Dashboard';
import { Home } from './web/Home/Home';
import { Form } from './web/Authentication/Login';
import AuthenticationProvider  from './web/Context/AuthenticationContext';
import './App.css';


function App() {

  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home/> }/> 
          <Route path='/login' element={ <Form/> }/> 
          <Route path='/app' element={ <Dashboard/> }/> 
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
