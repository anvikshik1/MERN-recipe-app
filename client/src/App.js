import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateRecipe from './Pages/Create-recipe';
import SaveRecipe from './Pages/Save-recipe';
import Home from './Pages/Home';
import Auth from './Pages/auth';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route  path='/create-recipe' element={<CreateRecipe/>}/>
          <Route  path='/save-recipe' element={<SaveRecipe/>}/>
          <Route  path='/auth' element={<Auth/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
