import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountdownTimer from "./pages/Countdown"
import BirthdaySpecial from './pages/BirthdaySpecial';
import PhotoGallery from './pages/PhotoGallery';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CountdownTimer />} />
          <Route path="/birthday-special" element={<BirthdaySpecial />} />
          <Route path="/gallery" element={<PhotoGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;