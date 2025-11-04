import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .send("Ошибка при получении пользователей: " + error.message);
  }
});

router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    if (!user) {
      return res.status(404).send("Пользователь не найден");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Ошибка при получении пользователя: " + error.message);
  }
});

router.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).send("Пользователь не найден");
    }
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .send("Ошибка при обновлении пользователя: " + error.message);
  }
});

router.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("Пользователь не найден");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Ошибка при удалении пользователя: " + error.message);
  }
});

export default router;
