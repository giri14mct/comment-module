import React from "react";
import axios from "axios";
import { handleToast } from "../toast";
import { api_host } from "../../config";

const Menu = (props) => {
    let session_token = document.cookie.match("(^|;) ?session_token=([^;]*)(;|$)")

    const handleMenu = (e) => {
        props.history.push(`/${e}`)
    }

    const handleLogout = () => {
        axios.post(`https://c7d8-49-37-202-53.in.ngrok.io/authentication/logout`, {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': session_token && session_token[2]
                }
            }
        ).then(
            ({ data }) => {
                let Cookies = document.cookie.split(';');
                // set past expiry to all cookies
                Cookies.map(arr => document.cookie = arr + "=; expires=" + new Date(0).toUTCString())
                props.history.push("/")
                window.location.reload()
                handleToast(200, data.message)
            }
        ).catch(e =>
            handleToast(e.response.status, e.response.statusText)
        )
    }

    return (
        <>
            <div style={{ width: "100%", height: "100%", borderBottom: "none", display: "flex" }}>
                <div style={{ width: "20%", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>
                    <div>
                        <p style={{ cursor: "pointer" }} onClick={() => handleMenu("users")}>Users</p>
                        <p style={{ cursor: "pointer" }} onClick={() => handleMenu("comments")}>Comments</p>
                    </div>
                </div>
                <div style={{ width: "80%", padding: 12, background: "rgb(236, 217, 217)" }}>
                    <div style={{ width: "100%", textAlign: "end" }}>
                        <button onClick={handleLogout} style={{ margin: "20px" }}>LogOut</button>
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu