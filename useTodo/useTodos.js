import { todosReducer } from "../08-useReducer/TodosReducer";
import { useReducer } from "react";
import { useEffect } from "react";

export const useTodos = () => {
  let initialState = [];

  const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  };
  const [todos, dispatchTodo] = useReducer(todosReducer, initialState, init);

  const todosLosTodos = () => {
    return todos.length;
  };

  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };
    dispatchTodo(action);
  };

  const handleDeleteTodo = (id) => {
    dispatchTodo({
      type: "[TODO] Remove Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatchTodo({
      type: "[TODO] Toggle Todo",
      payload: id,
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos) || []);
  }, [todos]);

  return {
    todos,
    todosCount : todos.length,
    pandingTodosCount: todos.filter(todo=> !todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosLosTodos,
  };
};
