import React, { useState } from "react";
import { handleToast } from "../toast";
import axios from "axios";
import { api_host } from "../../config";

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post(`${api_host}/authentication/login`, {
      email, password
    },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(({ data }) => {
      document.cookie = `session_token = ${data.data.session_token}; expires = ${new Date(2147483647 * 1000).toUTCString()}`;
      document.cookie = `role = ${data.data.role}; expires = ${new Date(2147483647 * 1000).toUTCString()}`

      handleToast(200, data.message)
      props.history.push('/user')
      window.location.reload();
    }).catch(e => {
      handleToast(e.response.status, e.response.statusText)
    }
    )
  }

  return (
    <div class="main" >
      <div class="container" style={{ height: 438 }}>
        <h1>Login</h1>
        <div>
          <label>Username</label>
          <input type="text" onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="" onChange={handlePasswordChange} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <p className="link" onClick={() => props.history.push("/singup")}>
          You don't have an account?
        </p>
      </div>
    </div>
  )
}

export default Login