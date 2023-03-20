import React, { useState } from "react";
import { handleToast } from "../toast";
import axios from "axios";
import { api_host } from "../../config";

const Signup = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordConfirm = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password === confirmPassword) {
            await axios.post(`${api_host}/authentication/singup`, {
                user: {
                    email, password, password_confirmation: confirmPassword
                }
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(({ data }) => {
                handleToast(200, data.message)
                props.history.push("/")
            }).catch(e => {
                handleToast(e.response.status, e.response.data.data[0])
            }
            )
        }
        else {
            handleToast(422, "Password And Confirm Password Mismatch")
        }

    }

    return (
        <div class="main">
            <div class="container">
                <h1>Singup</h1>
                <div>
                    <label>Username</label>
                    <input type="text" onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="" onChange={handlePasswordChange} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" onChange={handlePasswordConfirm} />
                </div>
                <button onClick={handleSubmit}>Submit</button>
                <p className="link" onClick={() => props.history.push("/")}>
                    Already have an account?
                </p>
            </div>
        </div>
    )
}

export default Signup