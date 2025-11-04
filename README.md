Сущности:
User
id: string
username: string

email: string

password: string

role: string

rating: number

createdAt: Date

updatedAt: Date

Task (Задача)
id: string

title: string

description: string

difficulty: string

tags: string[] -

examples: Array<{input: string, output: string, explanation: string}>

authorId: string

authorRole: string

rating: number

createdAt: Date

Методы API

Аутентификация
POST /auth/register - регистрация пользователя

POST /auth/login - вход пользователя

Пользователи
GET /users - получить всех пользователей

GET /users/:id - получить пользователя по ID

PUT /users/:id - обновить пользователя

DELETE /users/:id - удалить пользователя

Задачи
GET /tasks - получить все задачи

GET /tasks/:id - получить задачу по ID

POST /tasks - создать задачу

PUT /tasks/:id - обновить задачу

DELETE /tasks/:id - удалить задачу
