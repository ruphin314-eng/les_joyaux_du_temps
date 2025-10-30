import React from 'react'
import { SignUp } from "@clerk/clerk-react"

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="shadow-lg rounded-xl p-6 bg-white">
        <SignUp
          path="/signup"
          routing="path"
          signInUrl="/login"
          appearance={{
            elements: {
              formButtonPrimary: "bg-black hover:bg-pink-500 text-white",
            },
          }}
        />
      </div>
    </div>
  )
}

export default Signup;
