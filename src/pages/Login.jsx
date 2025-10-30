import React from 'react'
import { SignIn } from "@clerk/clerk-react"

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="shadow-lg rounded-xl p-6 bg-white">
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/signup"
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

export default Login;
