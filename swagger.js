import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "LeetCode Задание",
    description: "API LeetCode по программированию",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.js";
const routes = ["./routes/auth.js", "./routes/users.js", "./routes/tasks.js"];

swaggerAutogen()(outputFile, routes, doc);
