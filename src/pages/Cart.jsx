import CartTotal from "../components/CartTotal";
import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate(); // ✅ déclaration ici

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            details: item,
            quantiter: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
            >
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.details}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, item.details, Number(e.target.value))
                }
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type='number'
                min={1}
                defaultValue={item.quantiter}
              />
              <img
                onClick={() => updateQuantity(item._id, item.details, 0)}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt=''
              />
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate("/place-order")} // ✅ navigation fonctionne ici
              className='relative bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 
                text-white text-sm font-semibold my-8 py-3 px-6 rounded-full
                shadow-lg shadow-pink-300/40
                hover:scale-105 hover:shadow-pink-400/60
                transition-all duration-300 ease-in-out
                overflow-hidden group'
            >
              <span className='relative z-10'>PROCÉDER AU PAIEMENT</span>
              <span
                className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 
                group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] 
                transition-transform duration-500 ease-out'
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
