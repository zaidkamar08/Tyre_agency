import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-xl font-extrabold text-orange-500">JAIDA</span>
          <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Tyre Agency</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">All Products</Link>
          <Link to="/products?category=tyres" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Tyres</Link>
          <Link to="/products?category=parts" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Parts</Link>
          <Link to="/products?category=ev-batteries" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">EV Batteries</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
            <FiShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/admin" className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition-colors text-sm font-medium">
                <FiUser size={16} />
                Admin
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-1 text-gray-700 hover:text-red-500 transition-colors text-sm font-medium">
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-700 hover:text-orange-500 font-medium text-sm transition-colors">Login</Link>
              <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-orange-600 transition-colors">Sign Up</Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <Link to="/cart" className="relative p-2 text-gray-700">
            <FiShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-orange-500 font-medium">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-orange-500 font-medium">All Products</Link>
          <Link to="/products?category=tyres" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-orange-500 font-medium">Tyres</Link>
          <Link to="/products?category=parts" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-orange-500 font-medium">Parts</Link>
          <Link to="/products?category=ev-batteries" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-orange-500 font-medium">EV Batteries</Link>
          {user ? (
            <button onClick={handleSignOut} className="text-red-500 font-medium text-left">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="bg-orange-500 text-white px-4 py-2 rounded-full text-center font-bold">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
