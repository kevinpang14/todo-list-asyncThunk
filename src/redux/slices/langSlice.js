import { createSlice } from "@reduxjs/toolkit";

const translations = {
  en: {
    title: "To do List",
    add: "Add",
    update: "Update",
    delete: "Delete",
    done: "Done",
    placeholder: "Add new task...",
    noTodos: "You have no todos..",
  },
  id: {
    title: "Daftar Tugas",
    add: "Tambah",
    update: "Perbarui",
    delete: "Hapus",
    done: "Selesai",
    placeholder: "Tambah tugas baru...",
    noTodos: "Anda tidak memiliki tugas..",
  },
};

const initialState = {
  lang: "en",
  translations,
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { toggleLang } = langSlice.actions;
export default langSlice.reducer;
