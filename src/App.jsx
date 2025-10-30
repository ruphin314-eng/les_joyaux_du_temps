import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Chatbot from "./components/Chatbot";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import React from "react";
import SearchBar from "./components/SearchBar";
import Signup from "./pages/Signup";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import Clerk

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <Routes>
        {/* ✅ Pages accessibles sans être connecté */}
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* ✅ Routes protégées — nécessitent d'être connecté */}
        <Route
          path='/cart'
          element={
            <>
              <SignedIn>
                <Cart />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path='/place-order'
          element={
            <>
              <SignedIn>
                <PlaceOrder />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path='/orders'
          element={
            <>
              <SignedIn>
                <Orders />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>

      <Footer />
      <Chatbot/>
    </div>
  )
}

export default App
