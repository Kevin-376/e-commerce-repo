import React, { useContext } from 'react'
import './ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Items/items'

const ShopCategory = (props) => {
  const { all_product, loading, error } = useContext(ShopContext);

  const filteredProducts = all_product.filter(item => item.category === props.category);

  if (loading) {
    return (
      <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt={`${props.category} banner`} />
        <div className="shopcategory-indexSort">
          <p>
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt={`${props.category} banner`} />
        <div className="shopcategory-indexSort">
          <p>
            Error loading products: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt={`${props.category} banner`} />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{filteredProducts.length}</span> out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Sort dropdown" />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item) => (
          <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
