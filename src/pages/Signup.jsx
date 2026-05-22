import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { GiTyre } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-flex flex-col items-center">
            <GiTyre size={48} className="text-orange-500 mb-2" />
            <span className="text-2xl font-extrabold text-orange-500">JAIDA</span>
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Tyre Agency</span>
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck size={32} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Account Created!</h2>
              <p className="text-gray-400 text-sm">
                Check your email to confirm your account. Redirecting to login...
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Create account</h2>
              <p className="text-gray-400 text-sm mb-8">Sign up to start shopping</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="flex flex-col gap-5">

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                    Email Address
                  </label>
                  <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-orange-400 transition-colors">
                    <FiMail className="text-gray-400 flex-shrink-0" size={18} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 outline-none text-gray-700 bg-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                    Password
                  </label>
                  <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-orange-400 transition-colors">
                    <FiLock className="text-gray-400 flex-shrink-0" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="flex-1 outline-none text-gray-700 bg-transparent text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                    Confirm Password
                  </label>
                  <div className={"flex items-center bg-gray-50 border-2 rounded-xl px-4 py-3 gap-3 transition-colors " +
                    (confirmPassword && password !== confirmPassword
                      ? "border-red-300"
                      : "border-gray-200 focus-within:border-orange-400")}
                  >
                    <FiLock className="text-gray-400 flex-shrink-0" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="flex-1 outline-none text-gray-700 bg-transparent text-sm"
                    />
                    {confirmPassword && password === confirmPassword && (
                      <FiCheck className="text-green-500 flex-shrink-0" size={18} />
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 text-white font-extrabold py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </>
          )}
        </motion.div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
