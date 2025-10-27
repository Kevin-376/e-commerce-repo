import React, { useContext } from 'react'
import './popular.css'
import Item from '../Items/items'
import { ShopContext } from '../../Context/ShopContext'

const Popular = () => {
  const { all_product, loading, error } = useContext(ShopContext);

  const popularProducts = all_product.filter(product => product.category === 'women');

  if (loading) {
    return (
      <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
          {popularProducts.map((item, i) => {
            return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })}
        </div>
    </div>
  )
}

export default Popular
