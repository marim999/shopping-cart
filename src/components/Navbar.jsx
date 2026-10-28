import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
function Navbar() {
  const { theme, toggleTheme } = useTheme()
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="text-xl font-bold text-slate-900 dark:text-white">
            Shopping Cart
          </Link>

          <ul className="flex items-center gap-2">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
               
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                Cart
              </NavLink>

            </li>
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </li>
          </ul>
        </div>
      </nav>

    </>
  )
}

export default Navbar
