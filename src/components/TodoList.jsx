import React, { useDebugValue, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, deleteTodo, toggleTodo } from "../redux/async/todosSlice";
import { setTodoForUpdate } from "../redux/async/todosSlice";

const TodoList = () => {
  /// get the todos from the store
  const { todos, loading, error, isSuccess } = useSelector(
    (state) => state.todos
  );
  const { lang, translations } = useSelector((state) => state.langRed);
  const dispatch = useDispatch();

  //fetch todoss
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // re-fetch if isSuccess triggered, (add, delete, update)
  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchTodos());
    }
  }, [isSuccess]);

  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  /// if there is no todos, return a message
  if (todos.length === 0) {
    return (
      <div className="alert alert-info">
        <p>{translations?.[lang]?.noTodos}</p>
      </div>
    );
  }

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-secondary" : ""
          }`}
          onClick={() =>
            dispatch(
              toggleTodo({ id: todo.id, currentCompleted: todo.completed })
            )
          }
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div className="btn-group">
            <button
              className="btn btn-danger btn-sm mx-1"
              onClick={(e) => {
                e.stopPropagation(); // to ignore this when click the parent
                dispatch(deleteTodo(todo.id));
              }}
            >
              {translations?.[lang]?.delete}
            </button>
            <button
              className="btn btn-warning btn-sm mx-1"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setTodoForUpdate(todo));
              }}
            >
              {translations?.[lang]?.update}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
