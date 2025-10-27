import React, { useContext } from 'react'
import './NewCollections.css'
import Item from '../Items/items'
import { ShopContext } from '../../Context/ShopContext'

const NewCollections = () => {
  const { all_product, loading, error } = useContext(ShopContext);

  // Sort by date descending to get newest first
  const newCollections = all_product.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  if (loading) {
    return (
      <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="new-collections-item">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="new-collections-item">
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="new-collections-item">
        {newCollections.map((item, i)=>{
          return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections
