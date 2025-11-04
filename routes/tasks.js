import express from "express";
import Task from "../models/task.js";

const router = express.Router();

router.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("authorId", "username");
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Ошибка при получении задач: " + error.message);
  }
});

router.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "authorId",
      "username"
    );
    if (!task) {
      return res.status(404).send("Задача не найдена");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send("Ошибка при получении задачи: " + error.message);
  }
});

router.post("/api/tasks", async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      authorId,
      authorRole,
      rating,
    } = req.body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !authorId ||
      !authorRole ||
      !rating
    ) {
      return res.status(400).send("Нужно заполнить все поля");
    }

    const task = new Task({
      title,
      description,
      difficulty,
      tags: tags || [],
      examples: examples || [],
      authorId,
      authorRole,
      rating,
    });

    await task.save();
    const populatedTask = await Task.findById(task._id).populate(
      "authorId",
      "username"
    );

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).send("Ошибка при создании задачи: " + error.message);
  }
});

router.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("authorId", "username");

    if (!task) {
      return res.status(404).send("Задача не найдена");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send("Ошибка при обновлении задачи: " + error.message);
  }
});

router.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send("Задача не найдена");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Ошибка при удалении задачи: " + error.message);
  }
});

export default router;
