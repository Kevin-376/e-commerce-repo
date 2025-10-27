import React, { useContext } from 'react'
import './RelatedProducts.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Items/items'

const RelatedProducts = () => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {all_product.map((item, i) => {
          if (i >= 0 && i < 4) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          return null;
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
