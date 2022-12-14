import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Authenticated.css'

export default function Authenticated() {

  const [userinfo, setUserInfo] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let config = {
      method: 'get',
      headers: { "Authorization": localStorage.getItem("token") }
    }
    axios.get('http://127.0.0.1:3007/my/userinfo', config).then((res) => {
      setUserInfo(res.data)
    })
  }, [])

  const handleClick = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='wrapper'>
      <h1>Welcome!{userinfo.username}<button onClick={handleClick}>log out</button></h1>
      <img src={`http://127.0.0.1:3007/${userinfo.avatar}`}/>
    </div>
  )
}
