import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  const data = await response.data;
  return data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(API_URL, todo);
  const data = await response.data;
  return data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  const data = await response.data;
  return data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedData) => {
    console.log("updating todo to: ", updatedData);
    const response = await axios.put(
      `${API_URL}/${updatedData.id}`,
      updatedData
    );
    const data = await response.data;
    return data;
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  //asyncThunk only take single argument, so we passed it as an object
  async ({ id, currentCompleted }) => {
    console.log("id: ", id);
    const updatedData = { completed: !currentCompleted };
    console.log("currentcompleted: ", updatedData);
    const response = await axios.patch(`${API_URL}/${id}`, updatedData);
    const data = await response.data;
    return data;
  }
);

const initialState = {
  todos: [],
  todoUpdate: {}, //temp storage for data to be updated
  isUpdate: false,
  loading: false,
  error: null,
  isSuccess: false,
};

// if we use createAsyncThunk, we need to use extraReducers
// we can use addCase to add different case pending, fulfilled, rejected
// fethTodos.pending is for loading
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //for synchronous action
    //set temporary todo for update
    setTodoForUpdate: (state, action) => {
      state.todoUpdate = action.payload;
      state.isUpdate = true;
    },
    // and then reset the value
    resetUpdate: (state) => {
      state.todoUpdate = {};
      state.isUpdate = false;
    },
  },
  //for asynchronous action
  extraReducers: (builder) => {
    // fetch todos start
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // fetc todos end

    // add todo start
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(addTodo.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // add todo end

    //delete todo start
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    //delete todo end

    //update todo start
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );

      //reset the todo update temp and indicator
      state.isUpdate = false;
      state.todoUpdate = {};
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    //update todo end

    // toggle todo start

    builder.addCase(toggleTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);

      if (index !== -1) {
        state.todos[index] = updatedTodo;
      }

      state.loading = false;
    });
    builder.addCase(toggleTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to toggle todo";
    });
    // toggle todo end
  },
});

export const { setTodoForUpdate, resetUpdate } = todosSlice.actions;

// when using export default, the name doesn't have to be the same when we import
export default todosSlice.reducer;
