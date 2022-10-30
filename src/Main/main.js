import React from 'react'
import Login from "../Components/Login/Login"
import Chart from '../Components/Chart/Chart'
import {Route,Routes } from "react-router-dom"


const main = () => {
  return (
    <div className='main'>
      <Routes>
        <Route path= "/" element={<Login />} />
        <Route path= "/home" element={<Chart />} />
      </Routes>
    </div>
  )
}

export default main
