import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const {  cart ,addToCart ,totalItems,totalPrice, clearCart , removeFromCart ,decrementItem ,incrementItem} = useCart()

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">
          Back to products
        </Link>
      </div>
    )
  }

  

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Shopping Cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-20 w-20 rounded-lg bg-slate-50 object-contain p-2"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500  dark:text-slate-400">${item.price} each</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decrementItem(item.id)}
                className="h-8 w-8 rounded-lg border border-slate-300 hover:bg-slate-100"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{item.qty}</span>
              <button
                onClick={() => incrementItem(item.id)}
                className="h-8 w-8 rounded-lg border border-slate-300 hover:bg-slate-100"
              >
                +
              </button>
            </div>

            <span className="w-20 text-left font-bold text-slate-900">
              ${(item.price * item.qty).toFixed(2)}
            </span>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
          <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-slate-900 p-6 text-white">
  <div className="flex items-center justify-between text-slate-300">
    <span>Total items</span>
    <span className="font-medium">{totalItems}</span>
  </div>

  <div className="flex items-center justify-between">
    <span className="text-lg">Total price</span>
    <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
  </div>
</div>
    </main>
  )
}