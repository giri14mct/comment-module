import React, { useState, useEffect } from 'react'
import axios from "axios";
import { handleToast } from "../toast";
import { api_host } from "../../config";
import moment from 'moment';
import { titleize } from '../helper';

const User = () => {
  const [data, setData] = useState([])

  let session_token = document.cookie.match("(^|;) ?session_token=([^;]*)(;|$)")
  let role = document.cookie.match("(^|;) ?role=([^;]*)(;|$)")

  useEffect(() => {

    const fetchUser = async () => {
      await axios.get(`${api_host}/api/v1/users`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': session_token && session_token[2]
          }
        }
      ).then(
        ({ data }) => {
          setData(data.data);
        }
      ).catch(e =>
        handleToast(e.response.status, e.response.statusText)
      )
    }
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e, obj) => {
    axios.put(`${api_host}/api/v1/users/${obj.id}`, { [e.target.name]: e.target.value },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session_token && session_token[2]
        }
      }
    ).then(
      ({ data }) => {
        handleToast(200, data.message)
      }
    ).catch(e =>
      handleToast(e.response.status, e.response.data.data[0])
    )
  }

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Last LoggedIn</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td data-column="Email">{item.email}</td>
                <td data-column="Status">
                  {
                    role[2] !== "user" ?
                      <select name={"status"} id={item.status} onChange={(e) => handleChange(e, item)}>
                        <option selected={item.status === "active" && "selected"} value="active">Active</option>
                        <option selected={item.status === "inactive" && "selected"} value="inactive">Inactive</option>
                      </select>
                      : <p> {item.status} </p>
                  }
                </td>
                <td data-column="Role">
                  {
                    (role[2] === "user") ? <p>{titleize(item.role)}</p> :
                      (
                        role[2] === "admin" ? (
                          <select name={"role"} id={item.role} onChange={(e) => handleChange(e, item)}>
                            <option selected={item.role === "user" && "selected"} value="user">User</option>
                            <option selected={item.role === "admin" && "selected"} value="admin">Admin</option>
                          </select>
                        ) : role[2] === "super_admin" &&
                        <select name={"role"} id={item.role} onChange={(e) => handleChange(e, item)}>
                          <option selected={item.role === "user" && "selected"} value="user">User</option>
                          <option selected={item.role === "admin" && "selected"} value="admin">Admin</option>
                          <option selected={item.role === "super_admin" && "selected"} value="super_admin">Super Admin</option>
                        </select>
                      )
                  }
                </td>
                <td data-column="Last LoggedIn">{moment(item.last_logged_in).format("lll")}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default User