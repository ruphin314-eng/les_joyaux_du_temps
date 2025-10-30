import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { currency, products } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const clearOrders = () => {
  localStorage.removeItem("orders"); // supprime toutes les commandes du localStorage
  setOrders([]); // met à jour l’état pour vider l’affichage
};


  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <>
      <SignedIn>
        <div className="border-t pt-16 min-h-[80vh]">
          <div className="text-2xl mb-6">
            <Title text1={'MY'} text2={'ORDERS'} />
          </div>

          {orders.length === 0 ? (
            <p className="text-gray-500 text-center">You have no orders yet.</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold">Order #{index + 1}</p>
                    <p className="text-sm text-gray-500">Date: <span>{order.date}</span></p>
                    <p className="text-sm text-gray-500">Payment Method: <span>{order.paymentMethod}</span></p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="font-medium">Total: <span>{currency}{order.total}</span></p>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-3">
                  {order.items && Object.entries(order.items).length > 0 ? (
                    Object.entries(order.items).map(([productId, productData]) => {
                      const product = products.find(p => p._id === productId);
                      if (!product) return null;

                      if (typeof productData === 'object') {
                        return Object.entries(productData).map(([variant, qty]) => (
                          <div key={variant} className="flex items-center gap-4 border p-3 rounded-md">
                            <img src={product.image[0]} alt={product.name} className="w-16 h-16 object-cover rounded"/>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">{qty} × {currency}{product.price}</p>
                              <p className="text-xs text-gray-400">Detail: {variant}</p>
                            </div>
                          </div>
                        ));
                      }

                      return (
                        <div key={productId} className="flex items-center gap-4 border p-3 rounded-md">
                          <img src={product.image[0]} alt={product.name} className="w-16 h-16 object-cover rounded"/>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{productData} × {currency}{product.price}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm italic">No products found in this order.</p>
                  )}
                </div>
              </div>
            ))
          )}
          <div className="flex justify-between items-center mb-6">
  <Title text1={'MY'} text2={'ORDERS'} />
  {orders.length > 0 && (
    <button
      onClick={clearOrders}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
    >
      Supprimer tout
    </button>
  )}
</div>

        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Orders;
