import express from "express";
import cors from "cors";
import { createTodo, deleteTodo, getTodos } from "./db";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
    res.json(await getTodos());
});

app.delete("/todos/:id", async (req, res) => {
    res.json({
        result: await deleteTodo(req.params.id),
        newData: await getTodos(),
    });
});

app.post("/createTodo", async (req, res) => {
    let { title, body } = req.body;
    console.log(title, body);

    const result = await createTodo(title, body);

    if (result.acknowledged) {
        res.json({ message: "todo created" });
    } else {
        res.status(500).json({
            message: "unable to add todo",
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
