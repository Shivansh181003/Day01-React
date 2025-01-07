// import axios from "axios";

import axios from "axios";
import { useState } from "react";

export default function BackendTest() {
  const [resp, setResp] = useState("");

  async function responce() {
    const res = await axios.get("http://localhost:3001/");
    setResp(res.data.name);
  }
  responce();

  return <div className="pt-24">BackendTest {resp}</div>;
}
