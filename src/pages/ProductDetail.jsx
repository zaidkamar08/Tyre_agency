import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowLeft, FiShield, FiCheck } from "react-icons/fi";
import { GiTyre } from "react-icons/gi";
import { supabase } from "../supabase/client";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => { fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (!error) setProduct(data);
    setLoading(false);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryLabel = {
    tyres: "Tyres",
    parts: "Vehicle Parts",
    "ev-batteries": "EV Batteries",
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-2 gap-12 animate-pulse">
            <div className="bg-gray-200 rounded-3xl h-96" />
            <div className="space-y-4">
              <div className="bg-gray-200 rounded h-6 w-1/3" />
              <div className="bg-gray-200 rounded h-10 w-2/3" />
              <div className="bg-gray-200 rounded h-4 w-full" />
              <div className="bg-gray-200 rounded h-4 w-full" />
              <div className="bg-gray-200 rounded h-12 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl font-bold">Product not found</p>
          <Link to="/products" className="text-orange-500 font-bold mt-4 inline-block">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm flex-wrap">
          <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link to="/products" className="text-gray-400 hover:text-orange-500 transition-colors">Products</Link>
          <span className="text-gray-300">/</span>
          <Link to={"/products?category=" + product.category} className="text-gray-400 hover:text-orange-500 transition-colors">
            {categoryLabel[product.category]}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm h-96">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100">
                  <GiTyre size={100} className="text-orange-200 mb-4" />
                  <p className="text-orange-500 font-extrabold text-xl">{product.brand}</p>
                  <p className="text-gray-400 text-sm mt-1">{product.vehicle_type}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-4 flex-wrap">
              <span className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1">
                <FiCheck size={12} /> Genuine Product
              </span>
              <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1">
                <FiShield size={12} /> Warranty Included
              </span>
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-orange-100 text-orange-600 text-sm font-extrabold px-3 py-1 rounded-full">{product.brand}</span>
              {product.vehicle_type && (
                <span className="bg-gray-100 text-gray-600 text-sm font-bold px-3 py-1 rounded-full">{product.vehicle_type}</span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold text-gray-800 mb-4 leading-tight">{product.name}</h1>

            <div className="mb-6">
              <p className="text-4xl font-extrabold text-orange-500">Rs. {product.price?.toLocaleString()}</p>
              <p className={"text-sm font-medium mt-1 " + (product.stock > 0 ? "text-green-500" : "text-red-400")}>
                {product.stock > 0 ? "In Stock (" + product.stock + " available)" : "Out of Stock"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</p>
                <p className="font-bold text-gray-700">{categoryLabel[product.category]}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Brand</p>
                <p className="font-bold text-gray-700">{product.brand}</p>
              </div>
              {product.vehicle_type && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vehicle Type</p>
                  <p className="font-bold text-gray-700">{product.vehicle_type}</p>
                </div>
              )}
              {product.warranty && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">Warranty</p>
                  <p className="font-bold text-green-700">{product.warranty}</p>
                </div>
              )}
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold text-lg transition-colors"
                  >-</button>
                  <span className="px-4 py-2 font-extrabold text-gray-800 min-w-[40px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold text-lg transition-colors"
                  >+</button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={"flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-extrabold text-base transition-all duration-200 " +
                    (added
                      ? "bg-green-500 text-white"
                      : "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200")}
                >
                  <FiShoppingCart size={18} />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            )}

            <Link to="/products" className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
              <FiArrowLeft size={16} />
              Back to Products
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
