import {Router} from "express";
import { Todo } from "../models/todo";

const router = Router();

type RequestBody = {text: string};
type RequestParams = {todoId: string};

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({
    todos: todos
  })
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody; 
  const newTodo:Todo = {
    id: new Date().toISOString(),
    text: body.text
  }
  todos.push(newTodo);
  res.status(200).json({message:"todo has been created", todo:newTodo, todos:todos})
})

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;
  const todoId = params.todoId;
  const todoIndex: number = todos.findIndex(todo => {
    return todoId === todo.id;
  });
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(201).json({ message: "todo has been updated",todos: todos });
  }
  res.status(404).json({ message: "todo has not founded!" });
})

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const todoId = params.todoId;
  todos = todos.filter(todo => {
    return todo.id !== todoId;
  });
  res.status(200).json({
    message: "todo has been deleted successfully"
  });
})

export default router;
