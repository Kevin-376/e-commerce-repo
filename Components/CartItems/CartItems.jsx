import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const IMAGE_BASE_URL = process.env.PUBLIC_URL || '';

  return (
    <div className="cart-items">
      <div className="cart-items-title">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cart-items-title cart-items-item">
                <img
                  src={`${IMAGE_BASE_URL}${e.image}`}
                  alt={e.name || 'Product image'}
                  className='carticon-product-icon'
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/62x62?text=Product';
                  }}
                />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
              </div>
              <hr />
            </div>
          )
        }
        return null;
      })}
    </div>
  )
}

export default CartItems
