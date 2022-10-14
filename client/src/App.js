import './App.css';
import { Button, ButtonGroup, Center } from '@chakra-ui/react'
import Todos from './pages/Todos';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';



function App() {
  const {auth} = useContext(AuthContext)
  return (
    <div>
      <Header />
     <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/todos' element={auth ? <Todos/>:<Main/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
     </Routes>
    </div>
  );
}

export default App;
