import Signup from "./components/Signup";
import Login from './components/Login';
import Menu from "./components/Menu";
import { Toaster } from "react-hot-toast";
import "../src/style.css"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import User from "./components/Menu/user";
import Comment from "./components/Menu/comment";

function App() {
  let session_token = document.cookie.match("(^|;) ?session_token=([^;]*)(;|$)")
  return (
    <>
      <Router>
        <Switch>
          {
            session_token && session_token[2] ?
              <>
                <Route path="/users"  render={(props) => <Menu {...props}>
                  <User />
                </Menu>} />
                <Route path="/comments"  render={(props) => <Menu {...props}>
                  <Comment />
                </Menu>} />
              </>
              :
              <Route path="/"  render={(props) => <Login {...props} />} />
          }
          <Route path="/singup"  render={(props) => <Signup {...props} />} />
          <Route path="*" exact render={(props) => <Login {...props} />} />
        </Switch>
      </Router>
      <Toaster position={"top-center"} reverseOrder={false} />
    </>
  );
}

export default App;
