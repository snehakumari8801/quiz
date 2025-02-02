import React from 'react';

const ProgressBar = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div style={styles.progressBarContainer}>
      <div style={styles.progressBarText}>
        {current} / {total}
      </div>
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressBarFill,
            width: `${progressPercentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

// Styles
const styles = {
  progressBarContainer: {
    width: '100%',
    marginTop: '20px',
  },
  progressBarText: {
    textAlign: 'center',
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  progressBar: {
    width: '100%',
    height: '10px',
    backgroundColor: 'gray',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50', // Green color for progress
    borderRadius: '5px',
    transition: 'width 0.3s ease', // Smooth transition for progress
  },
};