
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './item.css'

const Item = (props) => {
  const IMAGE_BASE_URL = process.env.PUBLIC_URL || '';
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link to={`/product/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => window.scrollTo(0, 0)} aria-label={`View details for ${props.name}`}>
      <div className='item'>
          {imageLoading && <img src='https://via.placeholder.com/200x200?text=Loading...' alt='Loading...' className='loading-image' />}
          <img
            src={`${IMAGE_BASE_URL}${props.image}`}
            alt={props.name || 'Product image'}
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              setImageLoading(false);
              e.target.src = 'https://via.placeholder.com/200x200?text=Product';
            }}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
          <p>{props.name}</p>
          <div className="item-prices">
              <div className="item-price-new" aria-label={`New price: $${props.new_price}`}>
                ${props.new_price}
              </div>
              <div className='item-price-old' aria-label={`Old price: $${props.old_price}`}>
                ${props.old_price}
              </div>
          </div>
      </div>
    </Link>
  )
}

export default Item
