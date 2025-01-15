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

  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      // "Access-Control-Allow-Origin": "htp://localhost:8000",
    },
  });

  const [taskList, setTaskList] = useState([]);

  async function fetchTaskList() {
    console.log(import.meta.env.VITE_BACKEND_URL + "/tasklist");

    const responce = await instance.get("/tasklist", {
      withCredentials: true,
    });
    setTaskList(responce.data.tasks);
    console.log(responce.data.tasks);
  }

  async function addTask(event: any) {
    event.preventDefault();
    const task = event.target.task.value;

    const bodyFormData = new FormData();
    bodyFormData.append("task", task);

    await axios.post("http://localhost:3000/addtask", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    });

    fetchTaskList(); // Refresh the task list after adding a new task
  }

  useEffect(() => {
    if (!taskList[0]) {
      console.log("TaskList Empty !!");
      fetchTaskList();
    }
  }, []);

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
          <Tasks task={task} key={id} onCompletion={fetchTaskList} />
        ))}
      </div>
    </div>
  );
}

function Tasks({
  task,
  onCompletion,
}: {
  task: Task;
  onCompletion: () => void;
}) {
  async function handleCompletion(task: Task) {
    const uid = task.uid;
    const bodyFormData = new FormData();
    bodyFormData.append("uid", uid.toString());
    await axios.post(
      import.meta.env.BACKEND_URL + "/updateTask",
      bodyFormData,
      {
        withCredentials: true,
      }
    );
    onCompletion();
  }
  async function handleDeletion(task: Task) {
    const uid = task.uid;
    const bodyFormData = new FormData();
    bodyFormData.append("uid", uid.toString());
    await axios.post(
      import.meta.env.BACKEND_URL + "/deleteTask",
      bodyFormData,
      {
        withCredentials: true,
      }
    );
    onCompletion();
  }
  return (
    <div
      className={`flex gap-4 items-center justify-between p-8 w-full h-10 border-2 border-black rounded-2xl ${
        task.completed ? "bg-green-300" : "bg-red-300"
      }`}
    >
      <p className="font-semibold text-xl">{task.taskName}</p>
      <div className="flex gap-2">
        <button
          className="bg-blue-400 w-48 px-5 py-1 border-primary border-2 rounded-3xl"
          onClick={() => {
            handleCompletion(task);
          }}
        >
          Mark {task.completed ? "Uncomplete" : "Complete"}
        </button>
        <button
          className="bg-red-400 w-28 px-5 py-1 border-primary border-2 rounded-3xl font-semibold text-white"
          onClick={() => {
            handleDeletion(task);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
