import {  Link } from 'react-router-dom'
import React from 'react'

function PageNotFound() {
  return (
    <>
   
      <img src= "https://cdn.sanity.io/images/599r6htc/regionalized/dd4fc49d62e53911409d96f8b1cf11731279b813-2800x2800.png" alt="Page not found" className="max-w-md w-full mb-6" />
  <Link
        to="/"
        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
       Back To Home
      </Link>
    </>
  )
}

export default PageNotFound
