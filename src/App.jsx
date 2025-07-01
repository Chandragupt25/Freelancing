import { Routes, Route } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout/HomeLayout';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from '../src/Access/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Route>
      
    </Routes>
  );
}

export default App;
