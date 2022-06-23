import './App.css';
import './App.scss';
import Movies from './Movies';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleMovie from './SingleMovie';
import Error from './Error';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  

  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/id/:id" element={<SingleMovie />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
      
   

  )
}

export default App;
