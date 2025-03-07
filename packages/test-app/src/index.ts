import express from "express";
import { TestService } from "@internal/services";

const app = express();
app.use(express.json());

const version = "localdevelopment";
const testService = new TestService();

app.get("/todos", async (req, res) => {
    const todos = [{ id: 1, title: "Test create", completed: false }];
    res.json(todos);
});

app.post("/todos", async (req, res) => {
    const todo = { id: 1, title: "Test create", completed: false };
    res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
    const todo = { id: 1, title: "Test create", completed: false };
    res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
    res.json({ message: "Todo deleted" });
});

app.get("/version", (req, res) => {
    res.json({ version });
});

app.listen(3000, () => {
    // eslint-disable-next-line no-console
    testService.log("test");
    console.log("Server iss running on http://localhost:3000");
});
