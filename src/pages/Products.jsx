import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { GiTyre } from "react-icons/gi";
import { supabase } from "../supabase/client";
import { useCart } from "../context/CartContext";

const categoryTabs = [
  { key: "all", label: "All Products" },
  { key: "tyres", label: "Tyres" },
  { key: "parts", label: "Parts" },
  { key: "ev-batteries", label: "EV Batteries" },
];

const vehicleTypes = ["All", "Truck", "Bus", "Tractor", "Car", "Electric Auto"];
const brands = ["All", "MRF", "CEAT", "Apollo", "JK", "Bridgestone", "Excide", "Amara Raja", "Eastman", "Luminous"];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState({});

  const category = searchParams.get("category") || "all";
  const vehicle = searchParams.get("vehicle") || "";

  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => { if (vehicle) setSelectedVehicle(vehicle); }, [vehicle]);
  useEffect(() => { applyFilters(); }, [products, category, selectedVehicle, selectedBrand, search]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error) setProducts(data);
    setLoading(false);
  };

  const applyFilters = () => {
    let result = [...products];
    if (category !== "all") result = result.filter((p) => p.category === category);
    if (selectedVehicle !== "All") result = result.filter((p) => p.vehicle_type === selectedVehicle);
    if (selectedBrand !== "All") result = result.filter((p) => p.brand === selectedBrand);
    if (search.trim()) result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase()) ||
      p.vehicle_type?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  };

  const handleSearch = (val) => {
    setSearch(val);
    if (val.trim().length > 1) {
      const s = products.filter((p) =>
        p.name.toLowerCase().includes(val.toLowerCase()) ||
        p.brand?.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(s);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Our Products</h1>
          <p className="text-gray-500 mt-1">{filtered.length} products found</p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-2xl">
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-full px-5 py-3 gap-3 focus-within:border-orange-400 transition-colors shadow-sm">
            <FiSearch className="text-gray-400 flex-shrink-0" size={20} />
            <input
              type="text"
              placeholder="Search by name, brand or vehicle type..."
              className="flex-1 outline-none text-gray-700 bg-transparent text-sm"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl mt-2 z-20 overflow-hidden">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  className="w-full text-left px-5 py-3 hover:bg-orange-50 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0"
                  onClick={() => { setSearch(s.name); setSuggestions([]); }}
                >
                  <div className="flex items-center gap-3">
                    {s.image_url ? (
                      <img src={s.image_url} alt={s.name} className="w-8 h-8 rounded-lg object-cover" />
                    ) : (
                      <GiTyre size={20} className="text-orange-300" />
                    )}
                    <span className="text-gray-700 font-medium text-sm">{s.name}</span>
                  </div>
                  <span className="text-orange-500 text-sm font-bold">Rs. {s.price?.toLocaleString()}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSearchParams(tab.key === "all" ? {} : { category: tab.key })}
              className={"px-8 py-3 rounded-full font-bold text-base transition-all duration-200 " +
                (category === tab.key
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-400 hover:text-orange-500")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:border-orange-400 transition-colors cursor-pointer"
          >
            {vehicleTypes.map((v) => (
              <option key={v} value={v}>{v === "All" ? "All Vehicles" : v}</option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:border-orange-400 transition-colors cursor-pointer"
          >
            {brands.map((b) => (
              <option key={b} value={b}>{b === "All" ? "All Brands" : b}</option>
            ))}
          </select>

          {(selectedVehicle !== "All" || selectedBrand !== "All" || search) && (
            <button
              onClick={() => { setSelectedVehicle("All"); setSelectedBrand("All"); setSearch(""); }}
              className="bg-red-50 text-red-500 border border-red-200 rounded-full px-4 py-2 text-sm font-bold hover:bg-red-100 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="bg-gray-200 h-48" />
                <div className="p-4 space-y-2">
                  <div className="bg-gray-200 rounded h-4" />
                  <div className="bg-gray-200 rounded h-4 w-2/3" />
                  <div className="bg-gray-200 rounded h-8 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-xl font-bold mb-2">No products found</p>
            <p className="text-gray-400 text-sm">Try changing your filters or search terms</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -3 }}
              >
                {/* Product Image */}
                <Link to={"/products/" + product.id} className="block overflow-hidden h-48 bg-gray-50">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100">
                      <GiTyre size={48} className="text-orange-200 mb-2" />
                      <p className="text-orange-400 font-bold text-sm">{product.brand}</p>
                    </div>
                  )}
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                      {product.brand}
                    </span>
                    {product.vehicle_type && (
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                        {product.vehicle_type}
                      </span>
                    )}
                  </div>

                  <Link to={"/products/" + product.id}>
                    <h3 className="font-extrabold text-gray-800 text-sm mb-1 hover:text-orange-500 transition-colors leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {product.warranty && (
                    <p className="text-green-600 text-xs font-medium mb-2">{product.warranty}</p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-orange-500 font-extrabold text-lg">
                        Rs. {product.price?.toLocaleString()}
                      </p>
                      <p className={"text-xs font-medium " + (product.stock > 0 ? "text-green-500" : "text-red-400")}>
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={"p-2.5 rounded-full transition-all duration-200 " +
                        (added[product.id]
                          ? "bg-green-500 text-white"
                          : product.stock === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-orange-500 text-white hover:bg-orange-600")}
                    >
                      <FiShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
