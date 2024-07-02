const asyncHandler = require('express-async-handler');
const chatbotData = require('./chatdb');

// Function to get a question by its ID and page
const getQuestionById = (page, id) => {
  const pageData = chatbotData.pages[page];
  if (!pageData) {
    console.warn(`No data found for page ${page}`);
    return null;
  }

  const questionData = pageData.questions.find(question => question.id == id);
  
  if (!questionData) {
    console.warn(`No question found with ID ${id} on page ${page}`);
  }
  
  return questionData;
};

const getQuestion = asyncHandler(async (req, res) => {
  const { page, id } = req.params;
  const questionData = getQuestionById(page, id);
  
  if (!questionData) {
    return res.status(404).send('Question not found.');
  }
  
  res.json(questionData);
});

const handleResponse = asyncHandler(async (req, res) => {
  const { page, questionId, optionId } = req.query; // Adjusted to get params from query
  const questionData = getQuestionById(page, questionId);

  if (!questionData) {
    return res.status(404).send('Question not found.');
  }

  const selectedOption = questionData.options.find(option => option.id == optionId);

  if (!selectedOption) {
    return res.status(404).send('Option not found.');
  }

  if (selectedOption.nextQuestionId) {
    const nextQuestionData = getQuestionById(page, selectedOption.nextQuestionId);
    if (!nextQuestionData) {
      return res.status(404).send('Next question not found.');
    }
    res.json({ nextQuestion: nextQuestionData });
  } else if (selectedOption.url) {
    res.json({ url: selectedOption.url });
  } else if (selectedOption.courseId) {
    res.json({ courseId: selectedOption.courseId });
  } else {
    res.status(400).send('Invalid option selected.');
  }
});

module.exports = { getQuestion, handleResponse };
