import userAvatar from "../assets/user-avatar.svg";
import Icon from "../../public/todo-list-svgrepo-com.svg";
import { useEffect, useState } from "react";

export default function Header() {
  const [userName, setUserName] = useState("");
  const sessionData = localStorage.getItem("sessionData");

  useEffect(()=>{
    if (sessionData) {
      const name = JSON.parse(sessionData).name;
      setUserName(name);
    }
  }, [userName])

  return (
    <div className="h-20 border-b-slate-300 border-b-2 border-black flex justify-between items-center px-12 bg-background text-text fixed w-full">
      <div className="flex justify-center items-center space-x-2">
        <img src={Icon} width={30} alt="user-avatar" />
        <h1 className="text-2xl font-semibold">To-Do-App</h1>
      </div>
      <div className="flex justify-center items-center text-xl font-semibold gap-2">
        <span>{userName}</span>
        <img src={userAvatar} width={30} alt="user-avatar" />
      </div>
    </div>
  );
}
