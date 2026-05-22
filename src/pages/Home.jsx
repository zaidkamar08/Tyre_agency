import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight, FiShield, FiAward, FiPhone, FiMapPin, FiClock,
} from "react-icons/fi";
import {
  GiTyre, GiCarWheel, GiElectric,
} from "react-icons/gi";
import { FaTruck, FaBus, FaTractor, FaCar, FaBolt } from "react-icons/fa";
import { MdBatteryCharging80 } from "react-icons/md";

const categories = [
  {
    name: "Tyres",
    description: "Truck, Bus, Tractor, Car and Electric Auto tyres from MRF, CEAT, Apollo, JK and Bridgestone",
    link: "/products?category=tyres",
    icon: <GiTyre size={40} className="text-orange-500" />,
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    name: "Vehicle Parts",
    description: "Genuine batteries, tubes and essential vehicle parts with company warranty",
    link: "/products?category=parts",
    icon: <GiCarWheel size={40} className="text-gray-600" />,
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
  {
    name: "EV Batteries",
    description: "High performance Eastman batteries for electric auto rickshaws",
    link: "/products?category=ev-batteries",
    icon: <MdBatteryCharging80 size={40} className="text-green-600" />,
    bg: "bg-green-50",
    border: "border-green-200",
  },
];

const vehicleTypes = [
  { name: "Truck", icon: <FaTruck size={32} className="text-orange-500" />, link: "/products?category=tyres&vehicle=Truck" },
  { name: "Bus", icon: <FaBus size={32} className="text-orange-500" />, link: "/products?category=tyres&vehicle=Bus" },
  { name: "Tractor", icon: <FaTractor size={32} className="text-orange-500" />, link: "/products?category=tyres&vehicle=Tractor" },
  { name: "Car", icon: <FaCar size={32} className="text-orange-500" />, link: "/products?category=tyres&vehicle=Car" },
  { name: "Electric Auto", icon: <FaBolt size={32} className="text-orange-500" />, link: "/products?category=tyres&vehicle=Electric Auto" },
];

const brands = ["MRF", "CEAT", "Apollo", "JK", "Bridgestone", "Excide", "Eastman"];

const features = [
  {
    icon: <FiAward size={32} className="text-orange-500" />,
    title: "15+ Years Experience",
    desc: "Serving Chaibasa with trust and quality for over a decade",
  },
  {
    icon: <FiShield size={32} className="text-orange-500" />,
    title: "Company Warranty",
    desc: "All products come with official manufacturer warranty",
  },
  {
    icon: <GiTyre size={32} className="text-orange-500" />,
    title: "All Vehicle Types",
    desc: "Tyres and parts for trucks, buses, tractors, cars and EVs",
  },
];

export default function Home() {
  return (
    <div className="pt-16">

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-orange-100 font-medium uppercase tracking-widest text-sm mb-3">
              Bari Bazar, Chaibasa
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Jaida Tyre
              <br />
              Agency
            </h1>
            <p className="text-orange-100 text-lg mb-8 max-w-lg leading-relaxed">
              Your trusted destination for premium tyres, vehicle parts and EV batteries.
              Serving Chaibasa with top brands like MRF, CEAT, Apollo, JK and Bridgestone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition-all duration-200 flex items-center gap-2"
              >
                Shop Now <FiArrowRight />
              </Link>
              <Link
                to="/products?category=tyres"
                className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-orange-500 transition-all duration-200"
              >
                Browse Tyres
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 w-full max-w-sm">
              <div className="flex justify-center mb-6">
                <GiTyre size={80} className="text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-extrabold">15+</p>
                  <p className="text-orange-100 text-sm">Years of Trust</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-extrabold">7</p>
                  <p className="text-orange-100 text-sm">Top Brands</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-extrabold">5</p>
                  <p className="text-orange-100 text-sm">Vehicle Types</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-extrabold">100%</p>
                  <p className="text-orange-100 text-sm">Genuine</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Shop by Category</h2>
            <p className="text-gray-500">Find exactly what you need for your vehicle</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={cat.link}
                  className={"block p-8 rounded-2xl border-2 " + cat.bg + " " + cat.border + " hover:shadow-lg transition-all duration-300"}
                >
                  <div className="mb-4">{cat.icon}</div>
                  <h3 className="text-xl font-extrabold text-gray-800 mb-2">{cat.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{cat.description}</p>
                  <span className="text-orange-500 font-bold text-sm flex items-center gap-1">
                    Browse {cat.name} <FiArrowRight />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Vehicle */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Shop by Vehicle Type</h2>
            <p className="text-gray-500">Select your vehicle to find the right tyres</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {vehicleTypes.map((v, index) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={v.link}
                  className="flex flex-col items-center gap-3 bg-white border-2 border-gray-200 hover:border-orange-400 hover:shadow-md rounded-2xl px-10 py-6 transition-all duration-200"
                >
                  {v.icon}
                  <span className="font-bold text-gray-700">{v.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Brands We Stock</h2>
            <p className="text-gray-500">Only genuine products from trusted manufacturers</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                className="bg-gray-50 border-2 border-gray-200 rounded-2xl px-10 py-5 text-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg font-extrabold text-gray-700">{brand}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Why Choose Us</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, index) => (
              <motion.div
                key={f.title}
                className="bg-white rounded-2xl p-8 border border-gray-200 text-center hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h3 className="text-lg font-extrabold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Info */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-10">Visit Our Shop</h2>
            <div className="flex flex-wrap justify-center gap-12 mb-10">
              <div className="flex flex-col items-center gap-2">
                <FiMapPin size={28} />
                <p className="font-bold text-lg">Bari Bazar, Chaibasa</p>
                <p className="text-orange-100 text-sm">Near Life Medical</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FiClock size={28} />
                <p className="font-bold text-lg">Mon - Sun: 9am - 7pm</p>
                <p className="text-orange-100 text-sm">Friday: 9am - 1pm only</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FiPhone size={28} />
                <p className="font-bold text-lg">7992371248</p>
                <p className="text-orange-100 text-sm">WhatsApp available</p>
              </div>
            </div>
            <Link
              to="/products"
              className="bg-white text-orange-500 font-bold px-10 py-3 rounded-full hover:bg-orange-50 transition-all duration-200 inline-flex items-center gap-2"
            >
              Browse All Products <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-extrabold text-lg">JAIDA Tyre Agency</p>
            <p className="text-sm">Bari Bazar, Chaibasa</p>
          </div>
          <p className="text-sm">All rights reserved. 2026</p>
        </div>
      </footer>
    </div>
  );
}
