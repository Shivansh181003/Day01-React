import axios from "axios";
import { BaseSyntheticEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  async function submitForm(event: BaseSyntheticEvent) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL+"/loginUser",
      bodyFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "http://localhost:8000",
        },
        withCredentials: true,
      }
    );

    if (response.data.type === "success") {
      toast.success(response.data.message);
    } else if (response.data.type === "error") {
      toast.error(response.data.message);
    }

    console.log(response.data.name);
    

    if(response.data.name !== null) {
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          name: response.data.name,
          email: response.data.email,
        })
      );
    }

    navigate("/");
  }

  return (
    <div className=" w-full h-screen flex justify-center items-center flex-col">
      <form
        onSubmit={submitForm}
        className="border-2 p-10 rounded-xl bg-secondary bg-opacity-75 shadow-xl flex flex-col gap-2 w-1/3 justify-center items-center"
      >
        <h1 className="font-semibold text-4xl p-5 w-full text-center">Login</h1>
        <div className="flex flex-col">
          <label className="mx-2 text-xl">Email</label>
          <input
            type="email"
            name="email"
            placeholder="someone@example.com"
            className="border-2 border-black rounded-md p-2 px-5 m-2 text-xl font-semibold"
          />
        </div>
        <div className="flex flex-col">
          <label className="mx-2 text-xl">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 border-black rounded-md p-2 px-5 m-2 text-xl font-semibold"
          />
        </div>
        <button
          type="submit"
          className="border-2 border-black py-2 px-6 rounded-lg bg-primary text-white font-semibold text-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
}
