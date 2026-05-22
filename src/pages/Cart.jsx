import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiCheck } from "react-icons/fi";
import { GiTyre } from "react-icons/gi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase/client";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setPlacing(true);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ user_id: user.id, total_price: totalPrice, status: "pending" })
      .select()
      .single();

    if (orderError) {
      setPlacing(false);
      return;
    }

    const items = cart.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await supabase.from("order_items").insert(items);

    setOrdered(true);
    clearCart();
    setPlacing(false);
  };

  if (ordered) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="text-center bg-white rounded-3xl border border-gray-200 p-12 max-w-md mx-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Order Placed!</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Your order has been placed successfully. We will contact you shortly for delivery details.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8 text-left">
            <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Shop Contact</p>
            <p className="font-bold text-gray-800">Jaida Tyre Agency</p>
            <p className="text-gray-500 text-sm">Bari Bazar, Chaibasa</p>
            <p className="text-orange-500 font-bold text-sm mt-1">7992371248</p>
          </div>
          <Link
            to="/products"
            className="bg-orange-500 text-white font-extrabold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
          >
            <FiShoppingBag size={16} />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <GiTyre size={80} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Add some products to get started</p>
          <Link
            to="/products"
            className="bg-orange-500 text-white font-extrabold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
          >
            <FiShoppingBag size={16} />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">Your Cart</h1>
          <p className="text-gray-400 mt-1">{totalItems} item{totalItems > 1 ? "s" : ""}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 flex gap-4 hover:shadow-sm transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Product Icon */}
                <div className="bg-orange-50 rounded-xl w-20 h-20 flex-shrink-0 flex flex-col items-center justify-center border border-orange-100">
                  <GiTyre size={32} className="text-orange-300" />
                  <p className="text-orange-500 text-xs font-bold mt-1">{item.brand}</p>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-gray-800 text-sm leading-snug mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">{item.vehicle_type}</p>

                  <div className="flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold transition-colors text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-extrabold text-gray-800 text-sm min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-extrabold text-orange-500">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <Link
              to="/products"
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium mt-2"
            >
              <FiArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <h3 className="font-extrabold text-gray-800 text-lg mb-6">Order Summary</h3>

              <div className="flex flex-col gap-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 line-clamp-1 flex-1 pr-2">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-bold text-gray-700 flex-shrink-0">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">Total</span>
                  <span className="font-extrabold text-orange-500 text-xl">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full bg-orange-500 text-white font-extrabold py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>

              {!user && (
                <p className="text-center text-xs text-gray-400 mt-3">
                  You need to{" "}
                  <Link to="/login" className="text-orange-500 font-bold">login</Link>
                  {" "}to place an order
                </p>
              )}

              <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Shop</p>
                <p className="text-sm font-bold text-gray-700">Jaida Tyre Agency</p>
                <p className="text-xs text-gray-400">Bari Bazar, Chaibasa</p>
                <p className="text-sm font-bold text-orange-500 mt-1">7992371248</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
