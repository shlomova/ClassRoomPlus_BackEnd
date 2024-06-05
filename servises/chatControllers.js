// server/controllers/chatbotController.js

const asyncHandler = require('express-async-handler');
const chatbotData = require('./chatdb');

// Function to get a question by its ID
const getQuestionById = (id) => {
  const questionDataArray = Object.values(chatbotData);
console.log('questionDataArray', questionDataArray);
console.log(id);
  const questionData = chatbotData.questions.find(question => question.id== id);
  console.log('questionData', questionData);
  
  if (!questionData) {
    console.warn(`No question found with ID ${id}`);
  }
  
  return questionData;
};



const getQuestion = asyncHandler(async (req, res) => {
  
  const questionId = req.params.id;
  const questionData = getQuestionById(questionId);
  
  if (!questionData) {
    return res.status(404).send('Question not found.');
  }
  
  res.json(questionData);
});

const handleResponse = asyncHandler(async (req, res) => {
  const { questionId, optionId } = req.body;
  const questionData = getQuestionById(questionId);

  if (!questionData) {
    return res.status(404).send('Question not found.');
  }

  const selectedOption = questionData.options.find(option => option.id === optionId);

  if (!selectedOption) {
    return res.status(404).send('Option not found.');
  }

  if (selectedOption.nextQuestionId) {
    const nextQuestionData = getQuestionById(selectedOption.nextQuestionId);
    if (!nextQuestionData) {
      return res.status(404).send('Next question not found.');
    }
    res.json({ nextQuestion: nextQuestionData });
  } else if (selectedOption.url) {
    res.json({ url: selectedOption.url });
  } else {
    res.status(400).send('Invalid option selected.');
  }
});

module.exports = { getQuestion, handleResponse };
