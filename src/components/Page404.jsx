import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <p className="text-gray-600">The page you are looking for might be in another castle.</p>
        <div className="mt-8">
          <Link to='/' className="text-blue-500 hover:underline">Go back Signup</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Page404