import React from "react";
import "./App.scss";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import GeminiTest from "./components/GeminiTest/GeminiTest";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Home from "./pages/Home/Home";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/report" element={<GeminiTest model={model}/>} />
      </Routes>
    </BrowserRouter>
  );
}
