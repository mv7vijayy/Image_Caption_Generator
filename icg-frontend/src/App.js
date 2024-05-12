import './App.css';
import {Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home/Home';

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home/>} ></Route>
            {/* <Route path="*" element = {<NotFound/>}></Route> */}
          </Route>
      </Routes>
    </div>
  );
}

export default App;
