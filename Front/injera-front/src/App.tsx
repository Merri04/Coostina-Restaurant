import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './pages/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import ReservationPage from './pages/Reservation';
import Restaurant from './pages/Restaurant';


const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation/>} />
          <Route path="/restaurant" element={<Restaurant/>} />
        </Routes>
        <Footer />
      </LanguageProvider>
    </Router>
  );
}

export default App;
