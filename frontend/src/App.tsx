import { Route, Routes } from "react-router";
import Home from "./home/Home";
import Header from "./components/Header";
import BackendTest from "./components/BackendTest";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backendtest" element={<BackendTest />} />
      </Routes>
    </>
  );
}
