import './App.css'
import Home from './components/Home';
import Navbar from './components/Navbar'
import { Routes, Route} from "react-router-dom";
import Weather from './components/Weather';

function App() {
  

  return (
    <div className='app_main_container'>
      <div>
      <Navbar/>
      </div>
      <div>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="weather/:city" element={<Weather/>}/>
        </Routes>
        </div>
    </div>
  )
}

export default App
