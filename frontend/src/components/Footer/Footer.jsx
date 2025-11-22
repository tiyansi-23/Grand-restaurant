import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
          <div className="footer-content-left">
            {/* <img src={assets.logo} alt="" /> */}
            <h1 style={{ color: 'white' }}>Grand restaurant🍴</h1>
            <p>At Grand Restaurant, we believe food is more than just a meal – it’s an experience. Join us to enjoy authentic flavors, fresh ingredients, and unforgettable dining.</p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
            {/* <Link to='/navbar'>home</Link> */}

              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li><a href="https://wa.me/+919173228399">+919725704642</a></li>
              <li><a href="tiyansichodavadiya@gmail.com">tiyansichodavadiya@gmail.com</a></li>
            </ul>
          </div>
        </div>
        {/* <hr /> */}
        {/* <p className='footer-copyright'>Copyright 2024 @ skcart.com - All Right Reserved.</p> */}
    </div>
  )
}

export default Footer