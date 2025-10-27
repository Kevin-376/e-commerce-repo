import React, { useContext } from 'react'
import './Cart.css'
import { ShopContext } from '../Context/ShopContext'
import CartItems from '../Components/CartItems/CartItems'

const Cart = () => {
  const { getTotalCartAmount } = useContext(ShopContext);

  return (
    <div className='cart'>
      <CartItems />
      <div className="cart-bottom">
        <div className="cart-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cart-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
