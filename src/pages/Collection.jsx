import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/productItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [ category,setcategory] = useState([]);
  const [subCategory,setSubcatgory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
         setcategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setcategory(prev => [...prev,e.target.value])
    }
  }

  const togglesubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubcatgory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubcatgory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy)
    
  }

  const sortProducts = () => {

       let fpCopy = filterProducts.slice();

       switch (sortType) {
        case 'low-high':
          setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
          break;
        
        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
          break;

        default:
          applyFilter();
          break

       }

  }

 
  useEffect(()=>{
       applyFilter();
},[category,subCategory,search,showSearch])

useEffect(()=>{
    sortProducts();
},[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/*Filter Options*/ }
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : '' }` } src={assets.dropdown_icon} alt="" />
        </p>
        {/* category filtre */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Homme'} onChange={togglecategory} />Homme
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Femme'} onChange={togglecategory} />Femme
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Enfant'} onChange={togglecategory} />Enfant
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Unisexe'} onChange={togglecategory} />Unisexe
            </p>
          </div>
        </div>
        {/* subCategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Chaîne'} onChange={togglesubCategory} />Chaîne
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Collier'} onChange={togglesubCategory} />Collier
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Collier Personnalisé'} onChange={togglesubCategory} />Collier Personnalisé
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bracelet'} onChange={togglesubCategory} />Bracelet
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bracelet Perles'} onChange={togglesubCategory} />Bracelet Perles
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bracelet Personnalisé'} onChange={togglesubCategory} />Bracelet Personnalisé
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Pendentif Personnalisé'} onChange={togglesubCategory} />Pendentif Personnalisé
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Montre'} onChange={togglesubCategory} />Montre
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Montre Connectée'} onChange={togglesubCategory} />Montre Connectée
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Montre Sport'} onChange={togglesubCategory} />Montre Sport
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Pendentif'} onChange={togglesubCategory} />Pendentif
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Pendentif Initiale'} onChange={togglesubCategory} />Pendentif Initiale
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Boucles d\'Oreilles'} onChange={togglesubCategory} />Boucles d'Oreilles
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Puces d\'Oreilles'} onChange={togglesubCategory} />puces d'Oreilles
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Ensemble Bracelet'} onChange={togglesubCategory} />Ensemble Bracelet
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Jonc'} onChange={togglesubCategory} />Jonc
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Chevillère'} onChange={togglesubCategory} />Chevillère
            </p>
          </div>
        </div>
      </div>
        
        {/* right side */}
        <div className='flex-1'>

          <div className='flex justify-between text-base sm:text-2xl mb-4'>
             <Title text1={'ALL'} text2={'COLLECTIONS'} />
             {/* product Sort */}
             <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
             </select>
          </div>
           
           {/* map product0 */}
           <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterProducts.map((item,index)=>(
                  <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                ))
              }
           </div>

        </div>

    </div>
  )
}

export default Collection
