import axios from "axios";
import { useEffect, useState } from "react";

interface Task {
  taskName: string;
  completed: boolean;
}

export default function Home() {
  // const taskList = [
  //   {
  //     taskName: "Learn FrontEnd",
  //     completed: true,
  //   },
  //   {
  //     taskName: "Learn Backend",
  //     completed: false,
  //   },
  //   {
  //     taskName: "Learn Database",
  //     completed: false,
  //   },
  //   {
  //     taskName: "Learn Authentication",
  //     completed: false,
  //   },
  //   {
  //     taskName: "Final Integration",
  //     completed: false,
  //   },
  // ];
  
  const [taskList, setTaskList] = useState([])

  async function fetchTaskList(){
    const responce = await axios("http://localhost:3001/tasklist")
    setTaskList(responce.data.tasks)
    console.log(responce.data.tasks);
    
  }

  if(!taskList[0]){
    console.log("TaskList Empty !!");
    fetchTaskList()
  }

  
  return (
    <div className="flex justify-start pt-48 items-center h-full flex-col gap-8">
      <div className="w-4/5 flex justify-center items-center gap-10">
        <input
          type="text"
          placeholder="Add Task"
          name="task"
          className="w-96 bg-background border-2 border-text h-10 rounded-lg p-4 text-xl font-semibold"
        />
        <button
          type="submit"
          className="bg-secondary px-5 py-1 border-primary border-2 rounded-3xl"
        >
          Add
        </button>
        <button
          type="submit"
          className="bg-green-400 px-5 py-1 border-primary border-2 rounded-3xl"
          onClick={()=>{fetchTaskList()}}
        >
          Fetch
        </button>
      </div>
      <div id="taskList" className=" w-4/5 h-auto gap-5 flex flex-col">
        {taskList.map((task, id) => tasks(task, id))}
      </div>
    </div>
  );
}

function tasks(task: Task, id: number) {
  return (
    <div
      key={id}
      className={`flex gap-4 items-center justify-between p-8 w-full h-10 border-2 border-black rounded-2xl ${
        task.completed ? "bg-green-300" : "bg-red-300"
      }`}
    >
      <p className="font-semibold text-xl">{task.taskName}</p>
      <button className="bg-blue-400 w-48 px-5 py-1 border-primary border-2 rounded-3xl">
        Mark {task.completed ? "Uncomplete" : "Complete"}
      </button>
    </div>
  );
}
