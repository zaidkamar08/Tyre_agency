import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2, FiEdit, FiX, FiCheck, FiPackage, FiShoppingBag } from "react-icons/fi";
import { supabase } from "../supabase/client";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  name: "", description: "", price: "", category: "tyres",
  vehicle_type: "", brand: "", stock: "", warranty: "",
};

const categories = ["tyres", "parts", "ev-batteries"];
const vehicleTypes = ["Truck", "Bus", "Tractor", "Car", "Electric Auto", ""];
const brands = ["MRF", "CEAT", "Apollo", "JK", "Bridgestone", "Excide", "Amara Raja", "Eastman", "Luminous", "Generic"];

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("products");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    const { data: p } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    const { data: o } = await supabase.from("orders").select("*, order_items(*, products(name, price))").order("created_at", { ascending: false });
    if (p) setProducts(p);
    if (o) setOrders(o);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };

    if (editing) {
      await supabase.from("products").update(payload).eq("id", editing);
    } else {
      await supabase.from("products").insert(payload);
    }

    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
    setSaving(false);
    fetchData();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category,
      vehicle_type: product.vehicle_type || "",
      brand: product.brand || "",
      stock: product.stock,
      warranty: product.warranty || "",
    });
    setEditing(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    await supabase.from("products").delete().eq("id", id);
    setDeleteId(null);
    fetchData();
  };

  const updateOrderStatus = async (id, status) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchData();
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    confirmed: "bg-blue-100 text-blue-700 border-blue-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Admin Panel</h1>
            <p className="text-gray-400 mt-1">Manage products and orders</p>
          </div>
          {tab === "products" && (
            <button
              onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }}
              className="flex items-center gap-2 bg-orange-500 text-white font-bold px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors"
            >
              <FiPlus size={18} />
              Add Product
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setTab("products")}
            className={"flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all " +
              (tab === "products" ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-orange-400")}
          >
            <FiPackage size={16} />
            Products ({products.length})
          </button>
          <button
            onClick={() => setTab("orders")}
            className={"flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all " +
              (tab === "orders" ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-orange-400")}
          >
            <FiShoppingBag size={16} />
            Orders ({orders.length})
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <motion.div
            className="bg-white rounded-2xl border border-orange-200 p-6 mb-8 shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-gray-800 text-lg">
                {editing ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm); }} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g. MRF Nylogrip Truck Tyre"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Product description..."
                  rows={3}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Price (Rs.)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  placeholder="e.g. 8500"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Stock</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  required
                  placeholder="e.g. 20"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c === "ev-batteries" ? "EV Batteries" : c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Brand</label>
                <select
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white"
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Vehicle Type</label>
                <select
                  value={form.vehicle_type}
                  onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white"
                >
                  <option value="">Not Applicable</option>
                  {vehicleTypes.filter(v => v).map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Warranty</label>
                <input
                  type="text"
                  value={form.warranty}
                  onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                  placeholder="e.g. 1 Year Manufacturer Warranty"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                />
              </div>

              <div className="md:col-span-2 flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-60"
                >
                  <FiCheck size={16} />
                  {saving ? "Saving..." : editing ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm); }}
                  className="border border-gray-200 text-gray-500 font-bold px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products Tab */}
        {tab === "products" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Brand</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-4"><div className="bg-gray-200 rounded h-4 w-48" /></td>
                        <td className="px-6 py-4"><div className="bg-gray-200 rounded h-4 w-20" /></td>
                        <td className="px-6 py-4"><div className="bg-gray-200 rounded h-4 w-16" /></td>
                        <td className="px-6 py-4"><div className="bg-gray-200 rounded h-4 w-20" /></td>
                        <td className="px-6 py-4"><div className="bg-gray-200 rounded h-4 w-12" /></td>
                        <td className="px-6 py-4"><div className="bg-gray-200 rounded h-4 w-16" /></td>
                      </tr>
                    ))
                  ) : products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800 text-sm">{p.name}</p>
                        {p.vehicle_type && <p className="text-gray-400 text-xs mt-0.5">{p.vehicle_type}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full capitalize">
                          {p.category === "ev-batteries" ? "EV Battery" : p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700 font-medium text-sm">{p.brand}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-orange-500 text-sm">Rs. {p.price?.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={"text-sm font-bold " + (p.stock > 0 ? "text-green-500" : "text-red-400")}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-blue-400 hover:text-blue-600 transition-colors"
                          >
                            <FiEdit size={16} />
                          </button>
                          {deleteId === p.id ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 text-xs font-bold">Confirm</button>
                              <button onClick={() => setDeleteId(null)} className="text-gray-400 hover:text-gray-600 text-xs font-bold">Cancel</button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteId(p.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                              <FiTrash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {tab === "orders" && (
          <div className="flex flex-col gap-4">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
                  <div className="bg-gray-200 rounded h-4 w-48 mb-3" />
                  <div className="bg-gray-200 rounded h-4 w-32" />
                </div>
              ))
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-400 font-bold text-lg">No orders yet</p>
              </div>
            ) : orders.map((order) => (
              <motion.div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="font-bold text-gray-700 text-sm font-mono">{order.id.slice(0, 8)}...</p>
                    <p className="text-gray-400 text-xs mt-1">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-orange-500 text-lg">Rs. {order.total_price?.toLocaleString()}</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={"mt-2 text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer " + (statusColors[order.status] || statusColors.pending)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {order.order_items && order.order_items.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Items</p>
                    <div className="flex flex-col gap-2">
                      {order.order_items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.products?.name} x{item.quantity}</span>
                          <span className="font-bold text-gray-700">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
