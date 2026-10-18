import express from "express";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  getTodobyId,
  toggleTodoById,
  updateTodo,
} from "../db/todos.query.js";
import { validateBody } from "../middleware/validateBody.js";
import { todosSchema } from "../schema.js";

export const todosRouter = express.Router();

//show all todos
todosRouter.get("/", async (req, res) => {
  const books = await getAllTodos();
  res.status(200).json({
    data: books,
  });
});

//show a todo by ID
todosRouter.get("/:id", async (req, res) => {
  const book = await getTodobyId(req.params.id);
  if (!book) {
    res.status(404).json({ error: "(404) ToDo not Found" });
  }
  res.status(200).json({
    data: book,
  });
});

//Create
todosRouter.post("/", validateBody(todosSchema), async (req, res) => {
  const { title, body } = req.body;
  await createTodo(title, body);
  res.status(201).json({
    message: "Todo Created",
  });
});

//update
todosRouter.put("/:id", validateBody(todosSchema), async (req, res) => {
  const existingTodo = await getTodobyId(req.params.id);
  if (!existingTodo) {
    res.status(404).json({ error: "(404) ToDo not Found" });
  }
  const title = req.body.title ?? existingTodo.title;
  const body = req.body.body ?? existingTodo.body;
  const done = req.body.done ?? existingTodo.done;

  if (!String(title).trim())
    return res.status(400).json({ error: "title can't be empty" });

  const result = await updateTodo(req.params.id, title, body, done);

  res.status(200).json({ message: "Todo Updated", data: result });
});

//toggle
todosRouter.patch("/:id/toggle", async (req, res) => {
  const todo = await toggleTodoById(req.params.id);
  if (!todo) return res.status(404).json({ error: "(404) ToDo not Found" });
  res.status(200).json({
    message: "done",
    data: todo,
  });
});

//delete
todosRouter.delete("/:id", async (req, res) => {
  if (req.params.id === null) {
    return res.status(400).json({
      error: "Todo not Found",
    });
  }
  await deleteTodoById(req.params.id);
  res.status(200).json({
    message: "Todo Deleted",
  });
});
