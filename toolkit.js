// configure store is replacement of createStore, createslice is replacement of createReducer
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

//combine of action and reducer
const counterSlice = createSlice({
  //name is replacement of reducer, name is the name of the slice
  name: "counter",
  initialState,
  reducers: {
    //increment is replacement of action
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

//middlware
const logger = (store) => (next) => (action) => {
  console.log("Action sekarang: ", action);
  next(action);
  console.log("State sekarang: ", store.getState());
};

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

//when the store changes, this function will be called
store.subscribe(() => {
  //   console.log("State sekarang: ", store.getState());
});

store.dispatch(counterSlice.actions.increment());
store.dispatch(counterSlice.actions.increment());
store.dispatch(counterSlice.actions.decrement());
