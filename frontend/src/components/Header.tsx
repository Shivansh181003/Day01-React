import userAvatar from "../assets/user-avatar.svg";
import Icon from "../../public/todo-list-svgrepo-com.svg";

export default function Header() {
  return (
    <div className="h-20 border-b-slate-300 border-b-2 border-black flex justify-between items-center px-12 bg-background text-text fixed w-full">
      <div className="flex justify-center items-center space-x-2">
        <img src={Icon} width={30} alt="user-avatar" />
        <h1 className="text-2xl font-semibold">To-Do-App</h1>
      </div>
      <img src={userAvatar} width={30} alt="user-avatar" />
    </div>
  );
}
