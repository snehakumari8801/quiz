// // api.js (or quizAPI.js)
// export const fetchQuizData = async () => {
//     try {
//       // Simulate an API call
//       const response = await fetch('Uw5CrX'); // Replace with your API endpoint
//       if (!response.ok) {
//         throw new Error('Failed to fetch quiz data');
//       }
  
//       const data = await response.json(); // Assuming the API responds with JSON data
//       return data; // Returns the quiz data
//     } catch (error) {
//       console.error('Error fetching quiz data:', error);
//       return null; // Return null if there's an error
//     }
//   };
  
export const fetchQuizData = async () => {
    try {
      const response = await fetch('https://api.jsonserve.com/Uw5CrX');
      console.log(response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Quiz data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      return null;
    }
  };
  