import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./async/todosSlice";
import langReducer from "./slices/langSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

//configure encryptor
const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_SECRET_KEY,
  onError: function (error) {
    console.log("Encryption error:", error);
  },
});

// configure redux persist, put encryptor to transforms
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todos"],
  transforms: [encryptor],
};

// combine reducers
const rootReducer = {
  todos: persistReducer(persistConfig, todoReducer),
  langRed: langReducer,
};

// create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions from redux-persist
        // You need to disable serializableCheck for Redux Toolkit's middleware when using redux-persist
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

// create persistor
export const persistor = persistStore(store);
