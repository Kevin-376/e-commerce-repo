import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import './LoginSignup.css'

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login: contextLogin, signup: contextSignup } = useContext(ShopContext);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const login = async (data) => {
    console.log("Login Function", data);
    const result = await contextLogin(data.email, data.password);

    if (result.success) {
      alert('Login successful!');
      navigate('/shop');
    } else {
      alert(result.message || 'Login failed')
    }
  }

  const signup = async (data) => {
    console.log("Signup Function", data);
    const result = await contextSignup(data.username, data.email, data.password);

    if (result.success) {
      // Subscribe to newsletter if checkbox is checked
      if (subscribeNewsletter) {
        try {
          const token = localStorage.getItem('auth-token');
          await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ email: data.email }),
          });
          alert('Signup successful! You have been subscribed to our newsletter.');
        } catch (error) {
          console.error('Newsletter subscription failed:', error);
          alert('Signup successful! (Newsletter subscription failed - you can subscribe later)');
        }
      } else {
        alert('Signup successful!');
      }
      navigate('/shop');
    } else {
      alert(result.message || 'Signup failed')
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit(state === "Login" ? login : signup)}>
          <div className="loginsignup-fields">
            {state === "Sign Up" && (
              <>
                <input {...register("username", { required: "Name is required" })} type="text" placeholder='Your Name' />
                {errors.username && <p className="error">{errors.username.message}</p>}
              </>
            )}
            <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} type="email" placeholder='Email Address' />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} type="password" placeholder='Password' />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <button type="submit">Continue</button>
        </form>
        {state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick={() => {setState("Login")}}>Login here</span></p> : <p className="loginsignup-login">Create an account? <span onClick={() => {setState("Sign Up")}}>Click here</span></p>}
        {state === "Sign Up" && (
          <div className="loginsignup-newsletter">
            <input
              type="checkbox"
              id="newsletter"
              checked={subscribeNewsletter}
              onChange={(e) => setSubscribeNewsletter(e.target.checked)}
            />
            <label htmlFor="newsletter">Subscribe to our newsletter for exclusive offers</label>
          </div>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
