import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets, products } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency ,addToCart } = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('')
  const [details, setDetails] = useState('')

  const fetchProductData = async () => {

    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(()=>{
    fetchProductData();
  },[productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reserve gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gallery-container'>
              {
                productData.image.map((item,index)=>(
                <img 
                 onClick={()=>setImage(item)} 
                  src={item} 
                  key={index} 
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer gallery-image' 
                  alt={`Produit ${index + 1}`} 
                    />
                 ))
              }
            </div>

            <div className='w-full sm:w-[80%] main-image-container'>
                 <img 
                 key={image} 
                 className='w-full h-auto main-product-image' 
                 src={image} 
                 alt="Produit sélectionné" 
                />
            </div>

        </div>
         {/*---------product info ---------- */}
         <div className='flex-1'>
           <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className=' flex items-center gap-1 mt-2'>
             <img src={assets.star_icon} alt="" className="w-3 5" />
             <img src={assets.star_icon} alt="" className="w-3 5" />
             <img src={assets.star_icon} alt="" className="w-3 5" />
             <img src={assets.star_icon} alt="" className="w-3 5" />
             <img src={assets.star_dull_icon} alt="" className="w-3 5" />
             <p className='pl-2'>(122)</p>
         </div>
         <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
         <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
         <div className='flex flex-col gap-4 my-8'>
          <p className='select-title'>Sélectionne un détail</p>
          <div className='details-container flex gap-2 flex-wrap mt-2'>
                {productData.details.map((item, index) => (
                <button
                key={index}
                onClick={() => setDetails(item)}
                className={`detail-btn ${item === details ? 'active' : ''}`}
                 >{item}</button>
                 ))}
          </div>

         </div>
         <button onClick={() => addToCart(productData._id,details)} className="add-to-cart mt-5">
            Ajouter au panier 🛒
          </button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
         </div>
        
      </div>

      {/*-----------Description & Review Section--------*/}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
           <p>Un site e-commerce est une plateforme en ligne qui facilite l’achat et la vente de produits ou de services sur Internet. Il sert de marché virtuel où les entreprises et les particuliers peuvent présenter leurs produits, interagir avec les clients et effectuer des transactions sans avoir besoin d’une présence physique. Les sites e-commerce ont gagné en popularité grâce à leur commodité, leur accessibilité et leur portée mondiale.</p>
           <p>Les sites e-commerce affichent généralement les produits ou services accompagnés de des descriptions détaillées, des images, des prix et toutes les variations disponibles (par exemple : tailles, couleurs). Chaque produit dispose habituellement d’une page dédiée contenant les informations pertinentes.</p>
        </div>
      </div>
      {/*------ display related products ------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
