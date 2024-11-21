import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./async/todosSlice";
import langReducer from "./slices/langSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    langRed: langReducer,
  },
});
