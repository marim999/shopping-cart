import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Home() {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((body) => setProducts(body.products))
  }, [])

  useEffect(() => {
    if (!message) return
    const time = setTimeout(() => setMessage(''), 2000)
    return () => clearTimeout(time)
  }, [message])

  const handleAddToCart = (product) => {
    addToCart(product)
    setMessage(`${product.title} ADD SUCCESSFULLY ✓`)
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (

    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
        <p className="mt-1 text-slate-500  dark:text-slate-400">Choose a product to add to cart</p>
      </div>

      {message && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {message}
        </div>
      )}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="mb-8 w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="flex h-56 items-center justify-center bg-slate-50 p-6">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-600">
                {product.category}
              </span>

              <h3 className="mt-3 line-clamp-2 text-base font-semibold text-slate-900">
                {product.title}
              </h3>

              <div className="mt-auto flex flex-col gap-3 pt-5">
                <span className="text-xl font-bold text-slate-900">${product.price}</span>

                <div className="flex gap-2">
                  <Link
                    to={`/details/${product.id}`}
                    className="flex-1 whitespace-nowrap rounded-lg border border-indigo-600 px-3 py-2 text-center text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                  >
                    Details
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 whitespace-nowrap rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-md shadow-indigo-500/30 transition hover:bg-indigo-700"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
        // no products
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-slate-500">No products found</p>
        )}
      </div>
    </main>
  )
}