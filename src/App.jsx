import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { toggleLang } from "./redux/slices/langSlice";
import { fetchTranslations } from "./redux/async/langSlice";

const App = () => {
  const dispatch = useDispatch();
  const { lang, translations } = useSelector((state) => state.langRed);

  const handleToggleLang = () => {
    const updatelang = lang === "en" ? "id" : "en";
    dispatch(toggleLang(updatelang));
  };

  useEffect(() => {
    dispatch(fetchTranslations(lang));
  }, [lang, dispatch]);

  return (
    <div className="container mt-5">
      {/* toggle language */}
      <button className="btn btn-secondary mb-4" onClick={handleToggleLang}>
        {lang === "en" ? "EN/ID" : "ID/EN"}
      </button>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">
                {/* changed language */}
                {translations?.[lang].title || "Todo List"}
              </h1>
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
