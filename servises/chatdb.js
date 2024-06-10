const chatbotData = {
  questions: [
    {
      id: 1,
      greeting: "Welcome to the Classroom Chatbot! How can I assist you today?",
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
          id: 3,
          text: "Join a course",
          url: "/courses/subscriptions"
        },
        {
          id: 4,
          text: "Post in a course",
          url: "/courses/post"
        },
        {
          id: 5,
          text: "Get assistance",
          nextQuestionId: 4
        },
        {
          id: 9,
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
          id: 6,
          text: "Create a new course",
          url: "/courses/create"
        },
        {
          id: 7,
          text: "Upload course content",
          url: "/courses/upload-content"
        },
        {
          id: 8,
          text: "Delete course content",
          url: "/courses/delete-content"
        },
        {
          id: 5,
          text: "Get assistance",
          nextQuestionId: 4
        },
        {
          id: 10,
          text: "Start over",
          nextQuestionId: 1
        }
      ]
    },
    {
      id: 4,
      text: "What kind of assistance do you need?",
      options: [
        {
          id: 11,
          text: "Help with course content",
          url: "/assistance/content"
        },
        {
          id: 12,
          text: "Find a friend in the course",
          url: "/assistance/find-friend"
        },
        {
          id: 13,
          text: "Upload a file",
          url: "/assistance/upload-file"
        },
        {
          id: 14,
          text: "Delete a file",
          url: "/assistance/delete-file"
        },
        {
          id: 15,
          text: "Post in a course",
          url: "/assistance/post"
        },
        {
          id: 16,
          text: "Start over",
          nextQuestionId: 1
        }
      ]
    }
  ]
};

module.exports = chatbotData;
