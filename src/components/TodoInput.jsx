// src/components/TodoInput.js
import React, { useState, useEffect } from "react";
// even using redux toolkit, we still need to use useDispatch hook to dispatch actions
import { useDispatch, useSelector } from "react-redux";

import { addTodo, updateTodo } from "../redux/async/todosSlice";
import { resetUpdate } from "../redux/async/todosSlice";
import { v4 as uuidv4 } from "uuid";
import { current } from "@reduxjs/toolkit";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { isUpdate, todoUpdate, loading } = useSelector((state) => state.todos);
  const { lang, translations } = useSelector((state) => state.langRed);

  // todoUpdate is temp storage for to be updated todo
  // if isUpdate is true, set the text to the current todoUpdate text
  useEffect(() => {
    if (isUpdate && todoUpdate) {
      setText(todoUpdate.text);
    }
  }, [isUpdate, todoUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (isUpdate) {
        dispatch(
          updateTodo({
            ...todoUpdate,
            text: text, //updated data after setText
          })
        );
      } else {
        dispatch(
          addTodo({
            id: uuidv4(),
            text: text,
            completed: false,
          })
        );
      }
      dispatch(resetUpdate());
      setText("");
    }
  };

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder={translations?.[lang]?.placeholder || "Add a new todo..."}
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
        <button
          className={`btn ${isUpdate ? "btn-warning" : "btn-primary"}`}
          type="submit"
          disabled={loading}
        >
          {isUpdate
            ? translations?.[lang]?.update || "Update"
            : translations?.[lang]?.add || "Add"}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
