import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const IMAGE_BASE_URL = process.env.PUBLIC_URL || '';

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name || 'Product image'}
            onError={(e) => e.target.src = 'https://via.placeholder.com/150x150?text=Image'}
          />
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name || 'Product image'}
            onError={(e) => e.target.src = 'https://via.placeholder.com/150x150?text=Image'}
          />
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name || 'Product image'}
            onError={(e) => e.target.src = 'https://via.placeholder.com/150x150?text=Image'}
          />
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name || 'Product image'}
            onError={(e) => e.target.src = 'https://via.placeholder.com/150x150?text=Image'}
          />
        </div>
        <div className="productdisplay-img">
          <img
            className='productdisplay-main-img'
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name || 'Product image'}
            onError={(e) => e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image'}
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div className={selectedSize === "S" ? "selected" : ""} onClick={() => setSelectedSize("S")}>S</div>
            <div className={selectedSize === "M" ? "selected" : ""} onClick={() => setSelectedSize("M")}>M</div>
            <div className={selectedSize === "L" ? "selected" : ""} onClick={() => setSelectedSize("L")}>L</div>
            <div className={selectedSize === "XL" ? "selected" : ""} onClick={() => setSelectedSize("XL")}>XL</div>
            <div className={selectedSize === "XXL" ? "selected" : ""} onClick={() => setSelectedSize("XXL")}>XXL</div>
          </div>
        </div>
        <div className="productdisplay-right-quantity">
          <h1>Quantity</h1>
          <div className="quantity-controls">
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <button onClick={() => { addToCart(product.id, quantity) }}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span> Women , T-Shirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags :</span> Modern, Latest</p>
      </div>
    </div>
  )
}

export default ProductDisplay
