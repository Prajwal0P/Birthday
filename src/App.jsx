// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Countdown from './pages/Countdown';
import BirthdaySpecial from './pages/BirthdaySpecial'; // Adjust path as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Countdown />} />
        <Route path="/birthday-special" element={<BirthdaySpecial />} />
      </Routes>
    </Router>
  );
}

export default App;