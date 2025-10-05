import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Correct from "./pages/Correct";
import Question from "./pages/Question";
import Wrong from "./pages/Wrong";
import "./style.css";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Question />} />
        <Route path="/Correct" element={<Correct />} />
        <Route path="/Wrong" element={<Wrong />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
