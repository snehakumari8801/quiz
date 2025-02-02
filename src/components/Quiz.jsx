import React, { useState, useEffect } from 'react';
import { fetchQuizData } from '../../src/utils/api';
import ProgressBar from './ProgressBar';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); 

  useEffect(() => {
    const loadQuizData = async () => {
      const data = await fetchQuizData();
      console.log(data)
      if (data) setQuizData(data.questions);
    };
    loadQuizData();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) return; 

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, [timeLeft]);

  const handleAnswerSelect = (option) => {
    const isCorrect = option.is_correct;
    console.log(isCorrect)
    setShowFeedback(true);

    if (isCorrect) setScore(score + 1);

    setSelectedAnswers([
      ...selectedAnswers,
      { questionId: quizData[currentQuestion].id, selectedOptionId: option.id, isCorrect },
    ]);

    setTimeout(() => {
      setShowFeedback(false);
      setCurrentQuestion(currentQuestion + 1);
    }, 1000); 
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (quizData.length === 0) return <div style={styles.loading}>Loading...</div>;

  if (currentQuestion >= quizData.length) {
    return (
    <div style={styles.main}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Quiz Completed!</h2>
        <p style={styles.score}>Your Score: {score} / {quizData.length}</p>
      </div>
      </div>
    );
  }

  const { description, options } = quizData[currentQuestion];

  return (
    <div style={styles.main}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Question {currentQuestion + 1}</h2>
        <p style={styles.question}>{description}</p>
        <ul style={styles.optionsList}>
          {options.map((option) => {
            // Find if the current option is selected and if it's correct/incorrect
            const selectedAnswer = selectedAnswers.find(
              (answer) =>
                answer.questionId === quizData[currentQuestion].id &&
                answer.selectedOptionId === option.id
            );
            const isSelected = selectedAnswer !== undefined;
            const isOptionCorrect = isSelected && selectedAnswer.isCorrect;

            // Determine background color based on the option's state
            let optionStyle = styles.option;
            if (isSelected) {
              optionStyle = isOptionCorrect ? styles.isCorrectAnswer : styles.isNotCorrect;
            }

            return (
              <li
                key={option.id}
                onClick={() => handleAnswerSelect(option)}
                style={optionStyle}
              >
                {option.description}
              </li>
            );
          })}
        </ul>

        {showFeedback && (
          <div
            style={{
              ...styles.feedback,
              color: showFeedback ? (selectedAnswers.some(ans => ans.isCorrect) ? 'green' : 'red') : 'black',
            }}
          >
            {/* {showFeedback ? (selectedAnswers.find(ans => ans.isCorrect) ? 'Correct! 🎉' : 'Incorrect! ❌') : null} */}
          </div>
        )}

        <ProgressBar current={currentQuestion + 1} total={quizData.length} />

        <div style={styles.timer}>
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

// Styles
const styles = {
  main: {
    backgroundImage: 'url(https://media.istockphoto.com/id/1339908748/vector/new-realistic-neon-sign-of-quiz-frame-logo-for-decoration-and-covering-on-the-dark-wall.jpg?s=612x612&w=0&k=20&c=Qn97UPTD2E-MXDC9khiDW9vQglFtjNCFvCtF0EkiDP8=)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '600px',
    width: '100%',
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light transparent background
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backdropFilter: 'blur(10px)', // Optional: gives a nice blurred effect behind the container
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5em',
    marginTop: '50px',
  },
  heading: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '1.8em',
    fontWeight: 'bold',
  },
  question: {
    fontSize: '1em',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#555',
    lineHeight: '1.5',
  },
  optionsList: {
    listStyle: 'none',
    padding: '0',
  },
  option: {
    padding: '15px 20px',
    margin: '12px 0',
    backgroundColor: '#f9f9f9',
    border: '2px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    fontSize: '1.1em',
    fontWeight: 'normal',
    boxSizing: 'border-box',
  },
  isCorrectAnswer: {
    padding: '15px 10px',
    backgroundColor: '#4CAF50', // Green for correct answers
    color: '#fff',
    border: '2px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    // transform: 'scale(1.05)', // Slight zoom-in effect
  },
  isNotCorrect: {
    padding: '15px 20px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#F44336', // Red for incorrect answers
    color: '#fff',
    // transform: 'scale(1.05)', // Slight zoom-in effect
  },
  feedback: {
    marginTop: '20px',
    fontSize: '1.4em',
    fontWeight: 'bold',
    padding: '10px',
    borderRadius: '8px',
    transition: 'opacity 0.3s ease',
  },
  score: {
    fontSize: '1.6em',
    color: 'blue',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  timer: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    marginTop: '30px',
    color: '#444',
  },
};  