import express from "express";
import { KnexClient, TodoRepository } from "@internal/repositories";

const app = express();
app.use(express.json());

const knexClient = new KnexClient();
const todoRepository = new TodoRepository(knexClient);

const version = "localdevelopment";

app.get("/todos", async (req, res) => {
    const todos = await todoRepository.getTodos();
    res.json(todos);
});

app.post("/todos", async (req, res) => {
    const { title } = req.body;
    const todo = await todoRepository.createTodo({ title });
    res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await todoRepository.updateTodo(parseInt(id, 10), {
        title,
        completed,
    });
    res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    await todoRepository.deleteTodo(parseInt(id, 10));
    res.json({ message: "Todo deleted" });
});

app.get("/version", (req, res) => {
    res.json({ version });
});

app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log("Server is running on http://localhost:3000");
});
