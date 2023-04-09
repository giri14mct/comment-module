import React from "react";
import axios from "axios";
import { handleToast } from "../toast";
import { api_host } from "../../config";
import { useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import { MdInsertComment } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';


const Menu = (props) => {
    let session_token = document.cookie.match("(^|;) ?session_token=([^;]*)(;|$)")
    const navigate = useNavigate()


    const handleLogout = () => {
        axios.post(`${api_host}/authentication/logout`, {},
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
                navigate("/")
                handleToast(200, data.message)
            }
        ).catch(e =>
            handleToast(e.response.status, e.response.statusText)
        )
    }

    return (
        <>
            <div style={{ width: "100%", height: "100%", borderBottom: "none", display: "flex" }}>
                <div style={{ width: "15%", backgroundColor: "#002500" }}>
                    <ul className="menu-list">

                        <li className="menu-items">
                            <a href="/comments" ><MdInsertComment size={20} /><span className="menu-typo">Comments</span></a>
                        </li>
                        <li className="menu-items">
                            <a href="/users" ><FaUser size={20} /><span className="menu-typo">Users</span></a>
                        </li>

                    </ul>
                </div>
                <div style={{ width: "85%", background: "#F4F5FA" }}>
                    <div style={{ textAlign: "end" }}>
                        <button onClick={handleLogout} style={{ margin: "20px" }}><FiLogOut size={20} /><span className="menu-typo">LogOut</span></button>
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