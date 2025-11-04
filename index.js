import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger-output.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.json({
    message: "API работает!",
    documentation: "http://localhost:3000/api-docs",
  });
});

mongoose
  .connect(
    "mongodb+srv://db_user:123@cluster0.6ln8qw8.mongodb.net/?appName=Cluster0"
  )
  .then(() => {
    console.log("БД подключена");
    app.listen(3000, () => {
      console.log("Сервер запущен");
    });
  });

export default app;
