import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chats from "./Pages/Chats";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} exact />
        <Route path="/chats" Component={Chats} />
      </Routes>
    </div>
  );
}

export default App;
