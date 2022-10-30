import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./login.css"
import { Validation } from './tools/Validation'
import { Token } from './tools/Token';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data,setData] =useState({
        username:"",
        password:""
    })
    const navigate = useNavigate();
    const [isLogged,setIsLogged] = useState(false)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [info,setInfo] = useState({});
    useEffect(() => {
      axios.get("user.json").then((response) => {
        setInfo(response.data[0])
      })
        setErrors(() => Validation(data))
    },[data,touched])
    
        const changeHandler = (event) => {
            setData({...data,[event.target.name]:event.target.value})        
        }
        const focusHandler = (event) => {
            setTouched({...touched,[event.target.name]: true})
        }
    
    const submitHandler = (event) => {
        event.preventDefault();
        if(!Object.keys(errors).length){
            if(info.username === data.username){
              if(info.password === data.password){
                setIsLogged(true)
                localStorage.setItem("Token",Token())
                console.log(localStorage.getItem("Token"))
              }
              else{
                alert("Invalid Password!")
              }
            }
            else{
              alert("Invalid User Name!")
            }
        }
        else{
            setTouched({
                username:true,
                password:true
            })
        }
    }
    if(isLogged){
      navigate("/home")
    }
    
      return (
        <div className='container'>
          <form className='formContainer' onSubmit={submitHandler}>
          <h2 className='header'>Login</h2>
          <div className='formField'>
            <label>User Name:</label>
            <input className={(errors.username && touched.username)? "uncompleted" : "formInput"} type="text" name='username' onChange={changeHandler} value={data.username}  onFocus={focusHandler}/>
            {errors.username && touched.username && <span>{errors.username}</span>}
          </div>
          <div className='formField'>
            <label>Password:</label>
            <input className={(errors.password && touched.password)? "uncompleted" : "formInput"} type="password" name='password' onChange={changeHandler} value={data.password} onFocus={focusHandler} />
            {errors.password && touched.password && <span>{errors.password}</span>}
          </div>
          <div className='formButtons'>
          <button type='submit'>Login</button>
          </div>
          </form>
        </div>
      )
}

export default Login