import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

router.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send("Нужно заполнить все поля");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Пользователь уже существует");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: "user",
      rating: 0,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "secret_key_123",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).send("Ошибка при регистрации: " + error.message);
  }
});

router.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Нужно заполнить все поля");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Неверный email или пароль");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Неверный email или пароль");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "secret_key_123",
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).send("Ошибка при входе: " + error.message);
  }
});

export default router;
