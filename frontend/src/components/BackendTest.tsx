import { useEffect, useState } from "react";

export default function BackendTest() {
  console.log("Rendered...");

  const [color, setColor] = useState("blue");

  let colour = "red";

  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  return (
    <>
      <div className="pt-24 text-2xl font-semibold">
        Value of COLOR is : {color} Count: {count}
      </div>
      <button
        onClick={() => {
          color === "blue" ? setColor("red") : setColor("blue");
        }}
        className={`border-2 border-black font-semibold text-md hover:bg-${color}-300 py-2 px-4 bg-${color}-400 rounded-xl mt-5`}
      >
        Change Color to {color === "red"? "blue": "red"}
      </button>
      <div id="box" className="w-16 h-10 border-2 border-black m-5 ">{colour}</div>
      <button
        onClick={()=>{
          colour = colour === "red"? "blue": "red";
          console.log(colour);
          const box = document.getElementById("box");
          box!.innerText = colour;
        }}
        className={`border-2 border-black font-semibold text-md hover:bg-${color}-300 py-2 px-4 bg-${color}-400 rounded-xl mt-5`}
      >
        Change Color to {colour === "red"? "blue": "red"}
      </button>
    </>
  );
}
