import './App.css';
import { Button, ButtonGroup, Center } from '@chakra-ui/react'
import Todos from './pages/Todos';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';



function App() {
  return (
    <div>
      <Header />
     <Routes>
      <Route path='/todos' element={<Todos/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
     </Routes>
    </div>
  );
}

export default App;
