import CartTotal from "../components/CartTotal";
import Orders from "./Orders";
import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("momo");
  const { cartItems, getCartAmount, navigate, setCartItems, products, currency } =
    useContext(ShopContext);

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // État pour les champs invalides
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
    // Retirer l'erreur si l'utilisateur a corrigé le champ
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
  const newErrors = {};

  // Vérifier que tous les champs sont remplis
  for (const key in deliveryInfo) {
    if (!deliveryInfo[key]) {
      newErrors[key] = "Ce champ est requis";
    }
  }

  // Vérifier la validité de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (deliveryInfo.email && !emailRegex.test(deliveryInfo.email)) {
    newErrors.email = "Email invalide";
  }

  // Vérifier le téléphone (au moins 8 chiffres, que des chiffres)
  const phoneRegex = /^\d{8,}$/;
  if (deliveryInfo.phone && !phoneRegex.test(deliveryInfo.phone)) {
    newErrors.phone = "Numéro de téléphone invalide";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handlePayment = () => {
    if (getCartAmount() === 0) {
      toast.error("Votre panier est vide !");
      return;
    }

    if (!validateForm()) {
      toast.error("Veuillez remplir tous les champs du formulaire !");
      return;
    }

    const orderData = {
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: getCartAmount(),
      paymentMethod: method,
      deliveryInfo,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    let message = `🛍️ *Nouvelle commande* - ${orderData.date}\n\n`;
    message += `💳 *Méthode de paiement:* ${
      method === "momo" ? "Mobile Money" : "Orange Money"
    }\n\n`;

    message += `📦 *Informations de livraison:*\n`;
    message += `Nom: ${deliveryInfo.firstName} ${deliveryInfo.lastName}\n`;
    message += `Email: ${deliveryInfo.email}\n`;
    message += `Adresse: ${deliveryInfo.street}, ${deliveryInfo.city}, ${deliveryInfo.state}, ${deliveryInfo.zipcode}, ${deliveryInfo.country}\n`;
    message += `Téléphone: ${deliveryInfo.phone}\n\n`;

    message += `📦 *Détails des produits:*\n`;
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      for (const variant in cartItems[productId]) {
        const quantity = cartItems[productId][variant];
        message += `• ${product.name} (${variant}) x${quantity} - ${
          product.price * quantity
        }${currency}\n`;
      }
    }

    message += `\n💰 *Total:* ${getCartAmount()}${currency}\n`;
    message += `\n📞 Merci pour votre achat ! 😊`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber =
      method === "momo" ? "237651217500" : "237651217501";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    setCartItems({});
    localStorage.removeItem("cartItems");

    window.open(whatsappUrl, "_blank");
    navigate("/orders");
  };

  const inputClass = (field) =>
    `border rounded py-1.5 px-3.5 w-full ${
      errors[field] ? "border-red-500 bg-red-50" : "border-gray-300"
    }`;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side: Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            name="firstName"
            value={deliveryInfo.firstName}
            onChange={handleChange}
            className={inputClass("firstName")}
            type="text"
            placeholder="First name"
          />
          <input
            name="lastName"
            value={deliveryInfo.lastName}
            onChange={handleChange}
            className={inputClass("lastName")}
            type="text"
            placeholder="Last name"
          />
        </div>
       <input
  name="email"
  value={deliveryInfo.email}
  onChange={handleChange}
  className={inputClass("email")}
  type="email"
  placeholder="Email address"
/>
{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        <input
          name="street"
          value={deliveryInfo.street}
          onChange={handleChange}
          className={inputClass("street")}
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            name="city"
            value={deliveryInfo.city}
            onChange={handleChange}
            className={inputClass("city")}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            value={deliveryInfo.state}
            onChange={handleChange}
            className={inputClass("state")}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zipcode"
            value={deliveryInfo.zipcode}
            onChange={handleChange}
            className={inputClass("zipcode")}
            type="number"
            placeholder="Zipcode"
          />
          <input
            name="country"
            value={deliveryInfo.country}
            onChange={handleChange}
            className={inputClass("country")}
            type="text"
            placeholder="Country"
          />
        </div>
       <input
  name="phone"
  value={deliveryInfo.phone}
  onChange={handleChange}
  className={inputClass("phone")}
  type="number"
  placeholder="Phone"
/>
{errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Right Side: Cart & Payment */}
      <div className="mt-8 w-full sm:max-w-[400px]">
        <CartTotal />
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex flex-col gap-3 mt-3">
            <div
              onClick={() => setMethod("momo")}
              className={`flex items-center gap-3 border p-2 cursor-pointer ${
                method === "momo" ? "bg-green-100" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "momo" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-700 text-sm font-medium">Mobile Money</p>
            </div>
            <div
              onClick={() => setMethod("orange")}
              className={`flex items-center gap-3 border p-2 cursor-pointer ${
                method === "orange" ? "bg-orange-100" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "orange" ? "bg-orange-500" : ""
                }`}
              ></p>
              <p className="text-gray-700 text-sm font-medium">Orange Money</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePayment}
              className="bg-black text-white px-16 py-3 text-sm hover:bg-pink-500 transition-colors duration-300"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
