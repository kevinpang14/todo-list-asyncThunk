import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  todoUpdate: {},
  isUpdate: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    // find the todo by id and toggle the completed property
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },

    // todoUpdate is for updating the todo
    currentTodo: (state, action) => {
      state.isUpdate = true;
      state.todoUpdate = action.payload;
    },

    // find the todo by id and update the text property
    updateTodo: (state, action) => {
      state.isUpdate = false;
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
  },
});

// export for component
export const { addTodo, deleteTodo, toggleTodo, updateTodo, currentTodo } =
  todosSlice.actions;

// export for reducer
export default todosSlice.reducer;
