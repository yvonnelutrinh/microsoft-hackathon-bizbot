import "./App.scss";
import GeminiTest from "./components/GeminiTest/GeminiTest";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function App() {
  return <GeminiTest model={model}/>;
}
