import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Home = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz'); // Navigates to the quiz page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Start Quiz</h1>
      <p style={styles.description}>Click the button below to begin the quiz and test your knowledge!</p>
      <button style={styles.startButton} onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default Home;



const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage: 'url(https://media.istockphoto.com/id/1339908748/vector/new-realistic-neon-sign-of-quiz-frame-logo-for-decoration-and-covering-on-the-dark-wall.jpg?s=612x612&w=0&k=20&c=Qn97UPTD2E-MXDC9khiDW9vQglFtjNCFvCtF0EkiDP8=)', // Background image for a quiz theme
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    heading: {
      color: '#fff',
      fontSize: '3.5em',
      fontWeight: 'bold',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Adds a shadow for better readability
    },
    description: {
      color: '#fff',
      fontSize: '1.5em',
      marginBottom: '30px',
      textAlign: 'center',
      maxWidth: '600px',
    },
    startButton: {
      padding: '15px 30px',
      fontSize: '1.2em',
      backgroundColor: '#4CAF50', // Green background for the button
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow to give a 3D effect
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      fontWeight: 'bold',
    },
    startButtonHover: {
      backgroundColor: '#45a049', // Darker green when hovering over the button
      transform: 'scale(1.05)', // Slight zoom effect on hover
    },
  };
  
  
