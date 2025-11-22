import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const LoginPopup = ({ setshowlogin }) => {

    const { url,setToken } = useContext(StoreContext)
    const [currstate, setcurrstate] = useState("Sign Up")
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata(data => ({ ...data, [name]: value }))
    }


    const onLogin = async (event) =>{
        event.preventDefault()
        let newUrl = url;
        if (currstate==="Login") {
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data)

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setshowlogin(false)
        }else{
            alert(response.data.message);
        }

    }



    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container' >
                <div className="login-popup-title">
                    <h2>{currstate}</h2>
                    <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currstate === "Login" ? <></> : <input type="text" name='name' onChange={onchangeHandler} value={data.name} placeholder='Your Name' required />}
                    <input type="email" name='email' onChange={onchangeHandler} value={data.email} placeholder='Your email' required />
                    <input type="password" name='password' onChange={onchangeHandler} value={data.password} placeholder='Password' required />
                </div>
                <button type='submit'>{currstate === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currstate === "Login"
                    ? <p>Create a new account? <span onClick={() => setcurrstate("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setcurrstate("Login")}>Login here</span></p>
                }

            </form>
        </div>
    )
}

export default LoginPopup