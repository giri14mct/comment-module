import Signup from "./components/Signup";
import Login from './components/Login';
import Menu from "./components/Menu";
import { Toaster } from "react-hot-toast";
import "../src/style.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import User from "./components/Menu/user";
import Comment from "./components/Menu/comment";

function App() {
  let session_token = document.cookie.match("(^|;) ?session_token=([^;]*)(;|$)")

  return (
    <Router>
      <Routes>
        <Route exact path="/users" element={<Menu >
          <User />
        </Menu>}
        />
        <Route exact path="/comments"
          element={<Menu>
            <Comment />
          </Menu>}
        />
        <Route exact path="/singup" element={<Signup />}
        />
        <Route exact path="/" element={<Login />} />

        {
          session_token && session_token[2] ?

            <Route exact path="/users"
              element={<Navigate to={"/users"} />}
            />
            : <Route exact path="/users"
              element={<Navigate to={"/"} />}
            />
        }
      </Routes>
      <Toaster position={"top-center"} reverseOrder={false} />
    </Router>
  );
}

export default App;
