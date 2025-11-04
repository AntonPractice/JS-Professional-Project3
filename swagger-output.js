export const swaggerDocs = {
  swagger: "2.0",
  info: {
    title: "LeetCode API",
    description: "API с задачами по программированию",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  paths: {
    "/api/auth/register": {
      post: {
        summary: "Регистрация пользователя",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              required: ["username", "email", "password"],
              properties: {
                username: {
                  type: "string",
                  example: "admin1",
                },
                email: {
                  type: "string",
                  example: "admin1@mail.ru",
                },
                password: {
                  type: "string",
                  example: "123",
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: "Пользователь создан",
          },
          400: {
            description: "Ошибка валидации",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Вход пользователя",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  example: "admin1@mail.ru",
                },
                password: {
                  type: "string",
                  example: "123",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Успешный вход",
          },
          401: {
            description: "Неверные данные",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
    },
    "/api/users": {
      get: {
        summary: "Получить всех пользователей",
        responses: {
          200: {
            description: "Список пользователей",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        summary: "Получить пользователя по ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID пользователя",
          },
        ],
        responses: {
          200: {
            description: "Данные пользователя",
          },
          404: {
            description: "Пользователь не найден",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
      put: {
        summary: "Обновить данные пользователя",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID пользователя",
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  example: "admin2",
                },
                role: {
                  type: "string",
                  example: "teacher",
                },
                rating: {
                  type: "number",
                  example: 777,
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Пользователь обновлен",
          },
          404: {
            description: "Пользователь не найден",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
      delete: {
        summary: "Удалить пользователя",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID пользователя",
          },
        ],
        responses: {
          204: {
            description: "Пользователь удален",
          },
          404: {
            description: "Пользователь не найден",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
    },
    "/api/tasks": {
      get: {
        summary: "Получить все задачи",
        responses: {
          200: {
            description: "Список задач",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
      post: {
        summary: "Создать новую задачу",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              required: [
                "title",
                "description",
                "difficulty",
                "authorId",
                "authorRole",
                "rating",
              ],
              properties: {
                title: {
                  type: "string",
                  example: "Первая задача",
                },
                description: {
                  type: "string",
                  example: "Напиши конкатенацию",
                },
                difficulty: {
                  type: "string",
                  example: "easy",
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  example: ["динамическое ", "программирование"],
                },
                examples: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      input: {
                        type: "string",
                        example: "['Петя','Вова']",
                      },
                      output: {
                        type: "string",
                        example: "ПетяВова",
                      },
                      explanation: {
                        type: "string",
                        example: "ПетяВова",
                      },
                    },
                  },
                },
                authorId: {
                  type: "string",
                  example: "507f1f77bcf86cd799439011",
                },
                authorRole: {
                  type: "string",
                  example: "teacher",
                },
                rating: {
                  type: "number",
                  example: 777,
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: "Задача создана",
          },
          400: {
            description: "Ошибка валидации",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
    },
    "/api/tasks/{id}": {
      get: {
        summary: "Получить задачу по ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID задачи",
          },
        ],
        responses: {
          200: {
            description: "Данные задачи",
          },
          404: {
            description: "Задача не найдена",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
      put: {
        summary: "Обновить задачу",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID задачи",
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Не первая задача",
                },
                description: {
                  type: "string",
                  example: "Не Описание",
                },
                difficulty: {
                  type: "string",
                  example: "medium",
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  example: ["структуры", "данных"],
                },
                examples: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      input: {
                        type: "string",
                      },
                      output: {
                        type: "string",
                      },
                      explanation: {
                        type: "string",
                      },
                    },
                  },
                },
                rating: {
                  type: "number",
                  example: 1000,
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Задача обновлена",
          },
          404: {
            description: "Задача не найдена",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
      delete: {
        summary: "Удалить задачу",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID задачи",
          },
        ],
        responses: {
          204: {
            description: "Задача удалена",
          },
          404: {
            description: "Задача не найдена",
          },
          500: {
            description: "Ошибка сервера",
          },
        },
      },
    },
  },
};
