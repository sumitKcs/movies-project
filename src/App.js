import './App.css';
import './App.scss';
import Movies from './Movies';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleMovie from './SingleMovie';
import Error from './Error';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Favourites from './Favourites';
import AddFavourites from './AddFavourites';
import Search from './Search';
import SearchGenre from './SearchGenre';

const App = () => {
  

  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/id/:media_type/:id" element={<SingleMovie />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/explore" element={<Home />} />
        <Route path="/:media_type/:genre_id/:genre_name" element={<SearchGenre/>} />
        <Route path="/:genre_name" element={<Home/>} />
        <Route path="/all" element={<Home/>} />
        
       
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
      
   

  )
}

export default App;
