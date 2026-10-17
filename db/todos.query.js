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

export async function createTodo(body, title, done) {
  const res = await pool.query(
    "INSERT INTO todos (title,body,done) VALUES ($1,$2,$3)",
    [body, title, done],
  );
  console.log(res);
  return res;
}

export async function updateBook(id, body, title, done) {

}

export async function deleteBookById(id) {}
