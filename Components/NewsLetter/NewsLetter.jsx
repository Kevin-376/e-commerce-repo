import React, { useState, useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './NewsLetter.css'

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useContext(ShopContext);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!isLoggedIn) {
      setMessage('Please log in to subscribe to the newsletter.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        setMessage('Please log in to subscribe to the newsletter.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for subscribing! You will receive exclusive offers soon.');
        setEmail('');
      } else {
        setMessage(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='newsLetter'>
      <p>Subscribe to our newsletter and stay updated</p>
      <h1>Get Exclusive Offers On Your Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder='Your Email id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
      {message && <p className="subscription-message">{message}</p>}
    </div>
  )
}

export default NewsLetter
