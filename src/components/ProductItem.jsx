import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      className="product-card text-gray-700 cursor-pointer"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden rounded-xl">
        <img
          className="product-image w-full transition-transform duration-700 ease-in-out"
          src={image[0]}
          alt={name}
        />
      </div>

      <div className="product-info text-center">
        <p className="product-name pt-3 pb-1 text-sm">{name}</p>
        <p className="product-price text-sm font-medium">
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
