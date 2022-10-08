import './App.css';
import { Button, ButtonGroup, Center } from '@chakra-ui/react'
import Todos from './pages/Todos';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header/>
<Todos/>
    </div>
  );
}

export default App;
