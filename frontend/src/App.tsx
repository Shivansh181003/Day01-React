import { Route, Routes } from "react-router";
import Home from "./home/Home";
import Header from "./components/Header";
import BackendTest from "./components/BackendTest";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import axios from "axios";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";



export default function App() {
  const navigate = useNavigate();

  const sessionData = localStorage.getItem("sessionData");

  async function handleSignOut() {
    localStorage.clear();
    await axios.get("http://localhost:3001/signOut", {
      withCredentials: true,
    });
    navigate("/login");
  }
  return (
    <>
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            sessionData !== null ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/backendtest" element={<BackendTest />} />
        <Route path="/signup" element={sessionData === null ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={sessionData === null ? <Login /> : <Navigate to="/" />} />
      </Routes>
      <div className="fixed bottom-5 left-5">
        <button
          onClick={handleSignOut}
          className="shadow-lg hover:bg-red-500 bg-secondary text-black font-semibold text-xl rounded-lg px-4 py-2"
        >
          Sign Out
        </button>
      </div>
    </>
  );
}
