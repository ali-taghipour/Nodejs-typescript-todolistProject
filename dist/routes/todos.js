"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
let todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({
        todos: todos
    });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json({ message: "todo has been created", todo: newTodo, todos: todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex(todo => {
        return todoId === todo.id;
    });
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(201).json({ message: "todo has been updated", todos: todos });
    }
    res.status(404).json({ message: "todo has not founded!" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const todoId = params.todoId;
    todos = todos.filter(todo => {
        return todo.id !== todoId;
    });
    res.status(200).json({
        message: "todo has been deleted successfully"
    });
});
exports.default = router;
