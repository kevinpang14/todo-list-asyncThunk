import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTranslations = createAsyncThunk(
  "lang/fetchTranslations",
  async (lang) => {
    console.log("language: ", lang);
    const response = await axios.get(`http://localhost:3000/lang/`);
    console.log("response: ", response);
    const translations = response.data[0]?.translations[lang];
    console.log("translations: ", translations);

    return translations;
  }
);

const langSlice = createSlice({
  name: "lang",
  initialState: {
    lang: "en",
    translations: {},
    loading: false,
    error: null,
  },
  reducers: {
    // toggle lang is inn reducers because it is not async
    toggleLang: (state, action) => {
      state.lang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTranslations.fulfilled, (state, action) => {
        state.loading = false;
        state.translations = action.payload || {}; // if no data, set to empty object
      })
      .addCase(fetchTranslations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleLang } = langSlice.actions;
export default langSlice.reducer;
