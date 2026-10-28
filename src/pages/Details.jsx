import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'


function Details() {

  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('product is not defind')
        return res.json()
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => setAdded(false), 2000)
    return () => clearTimeout(timer)

  }, [added])

  const handelAddToCart = () => {
    addToCart(product)
    setAdded(true)
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    )
  }
       if(error){
        return(
           <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="rounded-lg bg-red-50 px-6 py-4 text-red-600">{error}</p>
        <Link to="/" className="text-indigo-600 hover:underline">Back to products</Link>
      </div>
        )
       }

       const finalPrice = product.price - (product.discountPercentage || 0)/100

    return (
      <>
         <main className="mx-auto max-w-6xl px-6 py-10">
      <Link to="/" className="mb-6 inline-block text-indigo-600 hover:underline">
        ← Back to products
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* الصور */}
        <div className="flex flex-col gap-4">
          <div className="flex h-96 items-center justify-center rounded-2xl bg-slate-50 p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full object-contain"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {product.images?.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} ${i + 1}`}
                className="h-20 w-full rounded-lg bg-slate-50 object-contain p-1"
              />
            ))}
          </div>
        </div>

        {/* المعلومات */}
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-600">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>

          {product.brand && (
            <p className="text-slate-500">Brand: <span className="font-medium text-slate-700">{product.brand}</span></p>
          )}

          <p className="leading-relaxed text-slate-600">{product.description}</p>

          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-slate-900">${finalPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-slate-400 line-through">${product.price}</span>
                <span className="rounded-full bg-green-50 px-2 py-1 text-sm font-medium text-green-600">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-slate-500">Rating</p>
              <p className="font-semibold text-slate-900">⭐ {product.rating}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-slate-500">Stock</p>
              <p className="font-semibold text-slate-900">{product.stock} left</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-slate-500">Availability</p>
              <p className="font-semibold text-slate-900">{product.availabilityStatus}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-slate-500">Warranty</p>
              <p className="font-semibold text-slate-900">{product.warrantyInformation}</p>
            </div>
          </div>

          <p className="text-sm text-slate-500">🚚 {product.shippingInformation}</p>
          <p className="text-sm text-slate-500">↩️ {product.returnPolicy}</p>

          <button
            type="button"
            onClick={handelAddToCart}
            className="mt-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-md shadow-indigo-500/30 transition hover:bg-indigo-700"
          >
            {added ? 'Added to cart ✓' : 'Add to cart'}
          </button>
        </div>
      </div>

      {/* التقييمات */}
      {product.reviews?.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Reviews</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {product.reviews.map((review, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{review.reviewerName}</span>
                  <span className="text-sm text-yellow-500">⭐ {review.rating}</span>
                </div>
                <p className="text-sm text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
      </>
    )
  }

  export default Details
