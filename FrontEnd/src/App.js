import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/routes/Home';
import Login from './components/usersignin/Login';
import Signup from './components/usersignin/SignUp';
import About from './components/routes/About';
import Service from './components/routes/Service';
import Economy from './components/BookingClasses/EconomyClass';
import Platinum from './components/BookingClasses/PlatinumClass';
import Comfort from './components/BookingClasses/Comfortclass';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/economy" element={<Economy />} />
        <Route path="/platinum" element={<Platinum />} />
        <Route path="/comfort" element={<Comfort />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
