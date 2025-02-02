import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home'; // Import HomePage
import Quiz from '../src/components/Quiz'; // Import Quiz component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  
        <Route path="/quiz" element={<Quiz />} />  
      </Routes>
    </Router>
  );
};

export default App;
