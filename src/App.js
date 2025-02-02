import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home'; 
import Quiz from '../src/components/Quiz'; 

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
