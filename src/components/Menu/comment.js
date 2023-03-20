import React, { useState, useEffect } from 'react'
import axios from "axios";
import { handleToast } from "../toast";
import { api_host } from "../../config";
import { titleize } from '../helper';

const Comment = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')

  let session_token = document.cookie.match("(^|;) ?session_token=([^;]*)(;|$)")
  let role = document.cookie.match("(^|;) ?role=([^;]*)(;|$)")

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)

  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }
  const handleCreatePost = () => {
    axios.post(`https://c7d8-49-37-202-53.in.ngrok.io/api/v1/comments`,
      {
        comment: {
          content: content
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session_token && session_token[2]
        }
      }
    ).then(
      ({ data }) => {
        handleToast(200, data.message)
        handleClose()
      }
    ).catch(e =>
      handleToast(e.response.status, e.response.data.data[0])
    )

  }

  useEffect(() => {
    axios.get(`https://c7d8-49-37-202-53.in.ngrok.io/api/v1/comments`,
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
      handleToast(e.response.status, e.response.data.data[0])
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e, obj) => {
    axios.put(`https://c7d8-49-37-202-53.in.ngrok.io/api/v1/comments/${obj}`, { status: e.target.value },
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
    <>

      <div style={{ width: "100%", position: "relative" }}>
        <div style={{ width: "99%", textAlign: "end", margin: "10px 0px" }}>
          <button onClick={handleOpen} >Create Comment</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Content</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  <td data-column="Content">{item.content}</td>
                  <td data-column="Status">
                    {
                      role[2] !== "user" ?
                        <select name={item.status} onChange={(e) => handleChange(e, item.id)}>
                          <option selected={item.status === "drafted" && "selected"} value="drafted">Drafted</option>
                          <option selected={item.status === "published" && "selected"} value="published">Published</option>
                        </select>
                        : <p> {titleize(item.status)} </p>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {
          open &&
          <div style={{ position: "absolute", top: "50%", background: "#fff", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", width: "50%", height: "10rem", borderRadius: 5, left: "20%" }}>

            <div style={{ width: "80%", padding: 20 }}>
              <label>Enter your comment</label>
              <input style={{ border: "none", borderBottom: "1px solid", borderRadius: "initial" }} onChange={(e) => handleContentChange(e)} />
              <div style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
                <button onClick={handleCreatePost} >Create Comment</button>
              </div>
            </div>
          </div>
        }
      </div>
    </>

  )
}

export default Comment