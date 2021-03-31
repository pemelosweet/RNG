
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Hellow from './components/hellow'
import { Button } from 'antd';
function App() {
  return (
   <BrowserRouter>
   <div className="App">
   <Button type="primary">Button</Button>
    <Hellow/>
    </div>
   </BrowserRouter> 
  );
}

export default App;

