export const fetchQuizData = async () => {
  try {
    const response = await fetch("/Uw5CrX");
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Quiz data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};
