import React, { useState } from "react";
import { handleToast } from "../toast";
import axios from "axios";
import { api_host } from "../../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
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
      document.cookie = `id = ${data.data.id}; expires = ${new Date(2147483647 * 1000).toUTCString()}`

      handleToast(200, data.message)
      navigate('/comments')
    }).catch(e => {
      handleToast(e.response.status, e.response.statusText)
    }
    )
  }

  return (
    <div class="main" >
      <div class="container" >
        <h1>Login</h1>
        <div className="login-input">
          <label>Username</label>
          <input type="text" onChange={handleEmailChange} />
        </div>
        <div className="login-input">
          <label>Password</label>
          <input type="password" placeholder="" onChange={handlePasswordChange} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <p className="link" onClick={() => navigate("/singup")}>
          You don't have an account?
        </p>
      </div>
    </div>
  )
}

export default Login