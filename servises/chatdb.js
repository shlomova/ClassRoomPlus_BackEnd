const { on } = require("../models/usersModel");

const chatbotData = {
  pages: {
    home: {
      questions: [
        {
          id: 1,
          greeting: "Welcome to the Home Page Chatbot! How can I assist you today?",
          text: "Are you a student or a teacher?",
          options: [
            {
              id: 1,
              text: "Student",
              nextQuestionId: 2
            },
            {
              id: 2,
              text: "Teacher",
              nextQuestionId: 3
            }
          ]
        },
        {
          id: 2,
          text: "What would you like to do?",
          options: [
            {
              id: 1,
              text: "see your courses",
              url: "/courses"
            },

            {
              id: 2,
              text: "Get assistance",
              nextQuestionId: 4
            },
            {
              id: 3,
              text: "Start over",
              nextQuestionId: 1
            }
          ]
        },
        {
          id: 4,
          text: "How can I assist you further?",
          options: [
            {
              id: 1,
              text: "about a course",
              // on click will take you to a component that will display the course details
              url: "/about"
            },
            {
              id: 2,
              text: "Post in a course",
              nextQuestionId: 5

            },
            {
              id: 3,
              text: "Start over",
              nextQuestionId: 1
            }

          ]
        },
        {
          id: 5,
          text: "in what course would you like to post?",
          options: [
            // display a list of courses that the user is subscribed to or go to the courses page
            {
              id: 1,
              text: "Courses that you are subscribed to",
              url: "/App"
            },

            {
              id: 2,
              text: "Start over",
              nextQuestionId: 1
            }
          ]
        }
      ]
    },
    dashboard: {
      questions: [
        {
          id: 1,
          greeting: "Welcome to the Dashboard Chatbot! How can I assist you today?",
          text: "Do you need assistance with finding a course?",
          options: [
            {
              id: 1,
              text: "Yes",
              nextQuestionId: 2
            },
            {
              id: 2,
              text: "No",
              nextQuestionId: 3
            }
          ]
        },
        {
          id: 2,
          text: "Please enter the course name or keywords:",
          options: [
            {
              id: 1,
              text: "Open search bar",
              url: "/courses/search"
            },
            {
              id: 2,
              text: "Start over",
              nextQuestionId: 1
            }
          ]
        },
        {
          id: 3,
          text: "What else would you like to do?",
          options: [
            {
              id: 1,
              text: "View my courses",
              url: "/App"
            },
            {
              id: 2,
              text: "Go to homepage",
              url: "/dashboard"
            },
            {
              id: 3,
              text: "Start over",
              nextQuestionId: 1
            }
          ]
        }
      ]
    },
    APP: {
      questions: [
        {
          id: 1,
          text: "What would you like to do?",
          options: [
            {
              id: 1,
              text: "Add a course",
              url: "/add-course"
            },
            {
              id: 2,
              text: "Subscribe to a course",
              url: "/subscribe"
            },
            {
              id: 3,
              text: "Start over",
              nextQuestionId: 1
            }
          ]
        }
      ]
    },
    "course/${id}": {
      questions: [
        {
          id: 1,
          text: "Are you a student or a teacher?",
          options: [
            {
              id: 1,
              text: "Student",
              nextQuestionId: 2
            },
            {
              id: 2,
              text: "Teacher",
              nextQuestionId: 3
            }
          ]
        },
        {
          id: 2,
          text: "What would you like to do?",
          options: [
            {
              id: 1,
              text: "Post a post",
              url: "/course/:id/post"
            },
            {
              id: 2,
              text: "Delete a post",
              url: "/course/:id/delete-post"
            },
            {
              id: 3,
              text: "Start over",
              nextQuestionId: 1
            }
          ]
        },
        {
          id: 3,
          text: "What would you like to do?",
          options: [
            {
              id: 1,
              text: "Post in the course",
              url: "/course/:id/post"
            },
            {
              id: 2,
              text: "Post in the chatroom",
              url: "/course/:id/chatroom"
            },
            {
              id: 3,
              text: "Delete posts",
              url: "/course/:id/delete-posts"
            },
            {
              id: 4,
              text: "Start over",
              nextQuestionId: 1
            }
          ]
        }
      ]
    },
    contentsClass: {
      questions: [
        {
          id: 1,
          text: "What would you like to do?",
          options: [
            {
              id: 1,
              text: "Post a post",
              url: "/course/:id/post"
            },
            {
              id: 2,
              text: "Delete a post",
              url: "/course/:id/delete-post"
            },
            {
              id: 3,
              text: "Start over",
              nextQuestionId: 1
            }
          ]
        }
      ]
    },
    // Add other pages and their respective questions...






  }
};

module.exports = chatbotData;
