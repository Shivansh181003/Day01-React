import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../interfaces";

// interface Task {
//   taskName: string;
//   completed: boolean;
// }

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

  const [taskList, setTaskList] = useState([]);

  async function fetchTaskList() {
    const responce = await axios("http://localhost:3001/tasklist");
    setTaskList(responce.data.tasks);
    console.log(responce.data.tasks);
  }

  async function addTask(event: any) {
    event.preventDefault();
    const task = event.target.task.value;

    const bodyFormData = new FormData();
    bodyFormData.append("task", task);

    await axios.post("http://localhost:3001/addtask", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    fetchTaskList(); // Refresh the task list after adding a new task
  }

  if (!taskList[0]) {
    console.log("TaskList Empty !!");
    fetchTaskList();
  }

  return (
    <div className="flex justify-center  pt-48 items-center h-full flex-col gap-8">
      <div className="w-4/5 flex justify-center items-center gap-10">
        <form
          onSubmit={addTask}
          method="post"
          encType="multipart/form-data"
          className="w-full flex justify-around px-52"
        >
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
        </form>
      </div>
      <div id="taskList" className=" w-4/5 h-auto gap-5 flex flex-col">
        {taskList.map((task, id) => (
          <Tasks task={task} key={id} />
        ))}
      </div>
    </div>
  );
}

function Tasks({ task }: { task: Task }) {
  return (
    <div
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
