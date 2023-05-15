import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Main from "./components/Main";
import CreateForm from "./components/CreateForm"
import { UidContext } from "./components/AppContext"
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  const [uid, setUid] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}jwtid`);               
        setUid(res.data);
      } catch (err) {
        console.log("No token");
      }
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<CreateForm />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </UidContext.Provider>
  );
}

export default App;
