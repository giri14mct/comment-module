import React, { useState, useEffect } from 'react'
import axios from "axios";
import { handleToast } from "../toast";
import { api_host } from "../../config";
import { titleize } from '../helper';
import { MdAddComment } from 'react-icons/md';


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
    axios.post(`${api_host}/api/v1/comments`,
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
        fetchComments()
      }
    ).catch(e =>
      handleToast(e.response.status, e.response.data.data[0])
    )

  }

  const fetchComments = async () => {
    axios.get(`${api_host}/api/v1/comments`,
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
  }
  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e, obj) => {
    axios.put(`${api_host}/api/v1/comments/${obj}`, { status: e.target.value },
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
          <button onClick={handleOpen} ><MdAddComment size={20} /><span className="menu-typo">Create Comment</span></button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Content</th>
              <th>Status</th>
              <th>Commented By</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  <td data-column="Content">{item.content}</td>
                  <td data-column="Status">
                    {
                      role[2] === "super_admin" ?
                        <select name={item.status} onChange={(e) => handleChange(e, item.id)}>
                          <option selected={item.status === "drafted" && "selected"} value="drafted">Drafted</option>
                          <option selected={item.status === "approved" && "selected"} value="approved">Approved</option>
                          <option selected={item.status === "published" && "selected"} value="published">Published</option>
                        </select>
                        : role[2] === "admin" && item.status !== "published" ?
                          <select name={item.status} onChange={(e) => handleChange(e, item.id)}>
                            <option selected={item.status === "drafted" && "selected"} value="drafted">Drafted</option>
                            <option selected={item.status === "approved" && "selected"} value="approved">Approved</option>
                          </select> : <p> {titleize(item.status)} </p>
                    }
                  </td>
                  <td data-column="Commented By">{item.created_by ? item.created_by.email : <p> User Might Get Deleted</p>}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {
          open &&
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", width: "50%", height: "30vh", borderRadius: 5 }}>

            <div style={{ padding: "20px 40px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <div style={{ width: "100%" }}>
                <label >Enter your comment</label>
                <input type='text' className='comment-input' onChange={(e) => handleContentChange(e)} /></div>
              <div style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
                <button onClick={handleCreatePost} className="menu-typo">Create Comment</button>
              </div>
            </div>
          </div>
        }
      </div>
    </>

  )
}

export default Comment