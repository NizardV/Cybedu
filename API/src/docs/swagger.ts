const components = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  schemas: {
    HealthStatus: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' }
      }
    },
    User: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        email: { type: 'string', example: 'user@example.com' },
        roles: {
          type: 'array',
          items: { $ref: '#/components/schemas/Role' }
        }
      }
    },
    Role: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'admin' }
      }
    },
    Article: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        content: { type: 'string' }
      }
    },
    Quiz: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        article: { $ref: '#/components/schemas/Article' },
        questions: {
          type: 'array',
          items: { $ref: '#/components/schemas/Question' }
        }
      }
    },
    Question: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        text: { type: 'string' },
        quiz: { $ref: '#/components/schemas/Quiz' },
        answers: {
          type: 'array',
          items: { $ref: '#/components/schemas/Answer' }
        }
      }
    },
    Answer: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        text: { type: 'string' },
        isCorrect: { type: 'boolean' },
        question: { $ref: '#/components/schemas/Question' }
      }
    },
    UserQuiz: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        score: { type: 'number', format: 'float' },
        completedAt: { type: 'string', format: 'date-time' },
        user: { $ref: '#/components/schemas/User' },
        quiz: { $ref: '#/components/schemas/Quiz' }
      }
    },
    UserAnswer: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        user: { $ref: '#/components/schemas/User' },
        userQuiz: { $ref: '#/components/schemas/UserQuiz' },
        question: { $ref: '#/components/schemas/Question' },
        answer: { $ref: '#/components/schemas/Answer' }
      }
    },
    CreateUserPayload: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'P@ssword123' }
      }
    },
    CreateArticlePayload: {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        title: { type: 'string' },
        content: { type: 'string' }
      }
    },
    CreateQuizPayload: {
      type: 'object',
      required: ['title', 'articleId'],
      properties: {
        title: { type: 'string' },
        articleId: { type: 'integer' },
        questions: {
          type: 'array',
          items: {
            type: 'object',
            required: ['text'],
            properties: {
              text: { type: 'string' },
              answers: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['text'],
                  properties: {
                    text: { type: 'string' },
                    isCorrect: { type: 'boolean', default: false }
                  }
                }
              }
            }
          }
        }
      }
    },
    CreateQuestionPayload: {
      type: 'object',
      required: ['text', 'quizId'],
      properties: {
        text: { type: 'string' },
        quizId: { type: 'integer' },
        answers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              isCorrect: { type: 'boolean' }
            }
          }
        }
      }
    },
    CreateAnswerPayload: {
      type: 'object',
      required: ['text', 'questionId'],
      properties: {
        text: { type: 'string' },
        isCorrect: { type: 'boolean', default: false },
        questionId: { type: 'integer' }
      }
    },
    CreateRolePayload: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' }
      }
    },
    CreateUserQuizPayload: {
      type: 'object',
      required: ['userId', 'quizId'],
      properties: {
        userId: { type: 'integer' },
        quizId: { type: 'integer' },
        score: { type: 'number' },
        completedAt: { type: 'string', format: 'date-time' }
      }
    },
    CreateUserAnswerPayload: {
      type: 'object',
      required: ['userId', 'userQuizId', 'questionId', 'answerId'],
      properties: {
        userId: { type: 'integer' },
        userQuizId: { type: 'integer' },
        questionId: { type: 'integer' },
        answerId: { type: 'integer' }
      }
    },
    AuthResponse: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        user: { $ref: '#/components/schemas/User' }
      }
    },
    LoginPayload: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      }
    }
  }
};

const okArrayResponse = (schemaRef: string) => ({
  200: {
    description: 'Successful response',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: schemaRef }
        }
      }
    }
  }
});

const createdResponse = (schemaRef: string) => ({
  201: {
    description: 'Created',
    content: {
      'application/json': {
        schema: { $ref: schemaRef }
      }
    }
  }
});

const singleResponse = (schemaRef: string) => ({
  200: {
    description: 'Successful response',
    content: {
      'application/json': {
        schema: { $ref: schemaRef }
      }
    }
  }
});

const noContentResponse = {
  204: { description: 'No content' }
};

const paths = {
  '/health': {
    get: {
      tags: ['Health'],
      summary: 'Health check',
      responses: {
        200: {
          description: 'API is healthy',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/HealthStatus' }
            }
          }
        }
      }
    }
  },
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Authenticate user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/LoginPayload' }
          }
        }
      },
      responses: singleResponse('#/components/schemas/AuthResponse')
    }
  },
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register user and return token',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserPayload' }
          }
        }
      },
      responses: createdResponse('#/components/schemas/AuthResponse')
    }
  },
  '/auth/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Invalidate current token (client-side)',
      security: [{ bearerAuth: [] }],
      responses: {
        204: { description: 'Logged out' }
      }
    }
  },
  '/download/text': {
    get: {
      tags: ['Download'],
      summary: 'Download text file (default sample.txt)',
      parameters: [
        {
          name: 'file',
          in: 'query',
          required: false,
          schema: { type: 'string' },
          description: 'File name located in server download folder'
        }
      ],
      responses: {
        200: {
          description: 'File stream'
        }
      }
    }
  },
  '/users': {
    get: {
      tags: ['Users'],
      summary: 'List users',
      security: [{ bearerAuth: [] }],
      responses: okArrayResponse('#/components/schemas/User')
    },
    post: {
      tags: ['Users'],
      summary: 'Create user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserPayload' }
          }
        }
      },
      responses: createdResponse('#/components/schemas/User')
    }
  },
  '/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get user by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: singleResponse('#/components/schemas/User')
    },
    put: {
      tags: ['Users'],
      summary: 'Update user',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserPayload' }
          }
        }
      },
      responses: singleResponse('#/components/schemas/User')
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete user',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: noContentResponse
    }
  },
  '/articles': {
    get: {
      tags: ['Articles'],
      summary: 'List articles',
      responses: okArrayResponse('#/components/schemas/Article')
    },
    post: {
      tags: ['Articles'],
      summary: 'Create article',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateArticlePayload' }
          }
        }
      },
      responses: createdResponse('#/components/schemas/Article')
    }
  },
  '/articles/{id}': {
    get: {
      tags: ['Articles'],
      summary: 'Get article by id',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: singleResponse('#/components/schemas/Article')
    },
    put: {
      tags: ['Articles'],
      summary: 'Update article',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateArticlePayload' }
          }
        }
      },
      responses: singleResponse('#/components/schemas/Article')
    },
    delete: {
      tags: ['Articles'],
      summary: 'Delete article',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: noContentResponse
    }
  },
  '/roles': {
    get: {
      tags: ['Roles'],
      summary: 'List roles',
      security: [{ bearerAuth: [] }],
      responses: okArrayResponse('#/components/schemas/Role')
    },
    post: {
      tags: ['Roles'],
      summary: 'Create role',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateRolePayload' }
          }
        }
      },
      responses: createdResponse('#/components/schemas/Role')
    }
  },
  '/roles/{id}': {
    get: {
      tags: ['Roles'],
      summary: 'Get role by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: singleResponse('#/components/schemas/Role')
    },
    put: {
      tags: ['Roles'],
      summary: 'Update role',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateRolePayload' }
          }
        }
      },
      responses: singleResponse('#/components/schemas/Role')
    },
    delete: {
      tags: ['Roles'],
      summary: 'Delete role',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: noContentResponse
    }
  },
  '/quizzes': {
    get: {
      tags: ['Quizzes'],
      summary: 'List quizzes',
      responses: okArrayResponse('#/components/schemas/Quiz')
    },
    post: {
      tags: ['Quizzes'],
      summary: 'Create quiz',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateQuizPayload' }
          }
        }
      },
      responses: createdResponse('#/components/schemas/Quiz')
    }
  },
  '/quizzes/{id}': {
    get: {
      tags: ['Quizzes'],
      summary: 'Get quiz by id',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: singleResponse('#/components/schemas/Quiz')
    },
    put: {
      tags: ['Quizzes'],
      summary: 'Update quiz',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateQuizPayload' }
          }
        }
      },
      responses: singleResponse('#/components/schemas/Quiz')
    },
    delete: {
      tags: ['Quizzes'],
      summary: 'Delete quiz',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: noContentResponse
    }
  },
  '/questions': {
    get: {
      tags: ['Questions'],
      summary: 'List questions',
      responses: okArrayResponse('#/components/schemas/Question')
    },
    post: {
      tags: ['Questions'],
      summary: 'Create question',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateQuestionPayload' }
          }
        }
      },
      responses: createdResponse('#/components/schemas/Question')
    }
  },
  '/questions/{id}': {
    get: {
      tags: ['Questions'],
      summary: 'Get question by id',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: singleResponse('#/components/schemas/Question')
    },
    put: {
      tags: ['Questions'],
      summary: 'Update question',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateQuestionPayload' }
          }
        }
      },
      responses: singleResponse('#/components/schemas/Question')
    },
    delete: {
      tags: ['Questions'],
      summary: 'Delete question',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: noContentResponse
    }
  },
  '/questions/quiz/{quizId}': {
    get: {
      tags: ['Questions'],
      summary: 'List questions for quiz',
      parameters: [
        { name: 'quizId', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: okArrayResponse('#/components/schemas/Question')
    }
  },
  '/answers': {
    get: {
      tags: ['Answers'],
      summary: 'List answers',
      responses: okArrayResponse('#/components/schemas/Answer')
    },
    post: {
      tags: ['Answers'],
      summary: 'Create answer',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateAnswerPayload' }
          }
        }
      },
      responses: createdResponse('#/components/schemas/Answer')
    }
  },
  '/answers/{id}': {
    get: {
      tags: ['Answers'],
      summary: 'Get answer by id',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: singleResponse('#/components/schemas/Answer')
    },
    put: {
      tags: ['Answers'],
      summary: 'Update answer',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateAnswerPayload' }
          }
        }
      },
      responses: singleResponse('#/components/schemas/Answer')
    },
    delete: {
      tags: ['Answers'],
      summary: 'Delete answer',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: noContentResponse
    }
  },
  '/answers/question/{questionId}': {
    get: {
      tags: ['Answers'],
      summary: 'List answers for question',
      parameters: [
        { name: 'questionId', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: okArrayResponse('#/components/schemas/Answer')
    }
  },
  '/user-quizzes': {
    get: {
      tags: ['UserQuizzes'],
      summary: 'List attempts',
      security: [{ bearerAuth: [] }],
      responses: okArrayResponse('#/components/schemas/UserQuiz')
    },
    post: {
      tags: ['UserQuizzes'],
      summary: 'Create attempt',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserQuizPayload' }
          }
        }
      },
      responses: createdResponse('#/components/schemas/UserQuiz')
    }
  },
  '/user-quizzes/{id}': {
    get: {
      tags: ['UserQuizzes'],
      summary: 'Get attempt by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: singleResponse('#/components/schemas/UserQuiz')
    },
    put: {
      tags: ['UserQuizzes'],
      summary: 'Update attempt',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserQuizPayload' }
          }
        }
      },
      responses: singleResponse('#/components/schemas/UserQuiz')
    },
    delete: {
      tags: ['UserQuizzes'],
      summary: 'Delete attempt',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: noContentResponse
    }
  },
  '/user-quizzes/user/{userId}': {
    get: {
      tags: ['UserQuizzes'],
      summary: 'List attempts for user',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'userId', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: okArrayResponse('#/components/schemas/UserQuiz')
    }
  },
  '/user-quizzes/quiz/{quizId}': {
    get: {
      tags: ['UserQuizzes'],
      summary: 'List attempts for quiz',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'quizId', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: okArrayResponse('#/components/schemas/UserQuiz')
    }
  },
  '/user-answers': {
    get: {
      tags: ['UserAnswers'],
      summary: 'List user answers',
      security: [{ bearerAuth: [] }],
      responses: okArrayResponse('#/components/schemas/UserAnswer')
    },
    post: {
      tags: ['UserAnswers'],
      summary: 'Create user answer',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserAnswerPayload' }
          }
        }
      },
      responses: createdResponse('#/components/schemas/UserAnswer')
    }
  },
  '/user-answers/{id}': {
    get: {
      tags: ['UserAnswers'],
      summary: 'Get user answer by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: singleResponse('#/components/schemas/UserAnswer')
    },
    put: {
      tags: ['UserAnswers'],
      summary: 'Update user answer',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserAnswerPayload' }
          }
        }
      },
      responses: singleResponse('#/components/schemas/UserAnswer')
    },
    delete: {
      tags: ['UserAnswers'],
      summary: 'Delete user answer',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: noContentResponse
    }
  },
  '/user-answers/attempt/{userQuizId}': {
    get: {
      tags: ['UserAnswers'],
      summary: 'List answers for attempt',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'userQuizId', in: 'path', required: true, schema: { type: 'integer' } }
      ],
      responses: okArrayResponse('#/components/schemas/UserAnswer')
    }
  }
};

export const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'CyberEdu API',
    version: '1.0.0',
    description: 'Documentation des endpoints REST de l’API CyberEdu.'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Développement local'
    }
  ],
  tags: [
    { name: 'Auth' },
    { name: 'Health' },
    { name: 'Users' },
    { name: 'Roles' },
    { name: 'Articles' },
    { name: 'Quizzes' },
    { name: 'Questions' },
    { name: 'Answers' },
    { name: 'UserQuizzes' },
    { name: 'UserAnswers' },
    { name: 'Download' }
  ],
  components,
  paths
};
