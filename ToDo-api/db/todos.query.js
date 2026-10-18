import { pool } from "../dbConnection.js";

export async function getAllTodos() {
  const res = await pool.query("SELECT * FROM todos");
  return res.rows;
}

export async function getTodobyId(id) {
  const res = await pool.query("SELECT * FROM todos WHERE id = $1 limit 1", [
    id,
  ]);
  return res.rows[0];
}

export async function createTodo(body, title) {
  const res = await pool.query(
    "INSERT INTO todos (title,body) VALUES ($1,$2)",
    [body, title],
  );
  return res;
}

export async function updateTodo(id, title, body, done) {
  const res = await pool.query(
    "UPDATE todos SET title = $1 ,body = $2 ,done = $3 WHERE id = $4",
    [title, body, done, id],
  );
  return res.rows[0];
}

export async function toggleTodoById(id) {
  const res = await pool.query(
    `UPDATE todos
     SET done = CASE WHEN done = 'yes' THEN 'no' ELSE 'yes' END
     WHERE id = $1
     RETURNING *`,
    [id],
  );
  return res.rows[0];
}

export async function deleteTodoById(id) {
  const res = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  return res;
}
