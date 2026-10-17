import express from "express";
import { createTodo, getAllTodos, getTodobyId } from "../db/todos.query.js";

process.loadEnvFile();

export const todosRouter = express.Router();

todosRouter.get("/", async (req, res) => {
  const books = await getAllTodos();
  res.status(200).json({
    data: books,
  });
});

todosRouter.get("/:id", async (req, res) => {
  const book = await getTodobyId(req.params.id);
  if (!book) {
    res.status(404).json({ error: "(404) ToDo not Found" });
  }
  res.status(200).json({
    data: book,
  });
});

todosRouter.post("/", async (req, res) => {
  const { title, body, done } = req.body;
  await createTodo(title, body, done);
  res.status(201).json({
    message: "Todo Created",
  });
});

todosRouter.put("/:id", async (req, res) => {
  const existingTodo = await getTodobyId(req.params.id);
  if (!existingTodo) {
    res.status(404).json({ error: "(404) ToDo not Found" });
  }


});

todosRouter.delete("/:id", async (req, res) => {});
