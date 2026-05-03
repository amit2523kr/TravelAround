import { Suspense, lazy, useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

const Home = lazy(() => import('./components/routes/Home'));
const Login = lazy(() => import('./components/usersignin/Login'));
const Signup = lazy(() => import('./components/usersignin/SignUp'));
const About = lazy(() => import('./components/routes/About'));
const Service = lazy(() => import('./components/routes/Service'));
const Economy = lazy(() => import('./components/BookingClasses/EconomyClass'));
const Platinum = lazy(() => import('./components/BookingClasses/PlatinumClass'));
const Comfort = lazy(() => import('./components/BookingClasses/Comfortclass'));
const Booking = lazy(() => import('./components/Booking/Book'));
const Payment = lazy(() => import('./components/routes/Payment'));
const BookingSuccess = lazy(() => import('./components/routes/BookingSuccess'));
const SearchResults = lazy(() => import('./components/routes/SearchResults'));

function AppShell() {
  const [isLoggedIn, setIsLoggedInState] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const location = useLocation();
  const isLuxuryHome = location.pathname === '/';
  const setIsLoggedIn = (value) => {
    setIsLoggedInState(value);
    localStorage.setItem('isLoggedIn', String(value));
  };

  const ProtectedPayment = () => {
    if (!isLoggedIn) {
      return (
        <Navigate
          to="/login"
          replace
          state={{
            from: location.pathname,
            bookingState: location.state,
            notice: 'Please login before continuing to payment.'
          }}
        />
      );
    }

    return <Payment />;
  };

  return (
    <>
      {!isLuxuryHome && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/economy" element={<Economy />} />
          <Route path="/platinum" element={<Platinum />} />
          <Route path="/comfort" element={<Comfort />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<ProtectedPayment />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </Suspense>
      {!isLuxuryHome && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
export default App;
