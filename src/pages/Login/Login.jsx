import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { saveOrUpdateUser } from "../../utils";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  LogIn,
  KeyRound,
  CheckCircle2,
  Shield,
  Store,
} from "lucide-react";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, resetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authAttempted, setAuthAttempted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  if (loading && !authAttempted) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setAuthAttempted(true);

    try {
      const { user } = await signIn(email, password);

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success("Welcome back! 🎉");
    } catch (err) {
      console.log(err);
      toast.error(
        err?.message || "Login failed. Please check your credentials.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setAuthAttempted(true);

    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success("Welcome back! 🎉");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Google sign in failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Forget password
  const handleResetPassword = async () => {
    if (!email) {
      return toast.error("Please enter your email first");
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <LogIn size={32} />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">
                Welcome Back
              </h1>
              <p className="text-center text-purple-100">
                Sign in to continue to TicketBari
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    disabled={isSubmitting}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    } text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed`}
                  />
                  {!errors.email &&
                    email &&
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      email,
                    ) && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <CheckCircle2 size={18} className="text-green-500" />
                      </div>
                    )}
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-600"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={isSubmitting}
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium hover:underline flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <KeyRound size={12} />
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors({ ...errors, password: "" });
                    }}
                    disabled={isSubmitting}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    } text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-600"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    disabled={isSubmitting}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500 font-medium">
                Or continue with
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle size={24} />
              <span>Continue with Google</span>
            </button>

            {/* Demo Credentials Section - User, Admin & Vendor */}
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500 font-medium">
                  Quick Demo Access
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Demo User Button */}
                <button
                  onClick={() => {
                    setEmail("lamia02@gmail.com");
                    setPassword("lA3456");
                    setErrors({});
                    toast.success(
                      "Demo User credentials loaded! Click Sign In to continue.",
                      {
                        icon: "👤",
                        duration: 3000,
                      },
                    );
                  }}
                  disabled={isSubmitting}
                  className="flex flex-col items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl hover:from-blue-100 hover:to-cyan-100 hover:border-blue-300 transition-all duration-200 font-semibold text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <KeyRound size={18} className="text-blue-600" />
                  </div>
                  <span className="text-sm">Demo User</span>
                </button>

                {/* Demo Admin Button */}
                <button
                  onClick={() => {
                    setEmail("farialrobama00@gmail.com");
                    setPassword("1234567Aa");
                    setErrors({});
                    toast.success(
                      "Admin credentials loaded! Click Sign In to continue.",
                      {
                        icon: "👑",
                        duration: 3000,
                      },
                    );
                  }}
                  disabled={isSubmitting}
                  className="flex flex-col items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 transition-all duration-200 font-semibold text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Shield size={18} className="text-purple-600" />
                  </div>
                  <span className="text-sm">Demo Admin</span>
                </button>

                {/* Demo Vendor Button */}
                <button
                  onClick={() => {
                    setEmail("aysha@gmail.com");
                    setPassword("09876Rr");
                    setErrors({});
                    toast.success(
                      "Vendor credentials loaded! Click Sign In to continue.",
                      {
                        icon: "🏪",
                        duration: 3000,
                      },
                    );
                  }}
                  disabled={isSubmitting}
                  className="flex flex-col items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:from-green-100 hover:to-emerald-100 hover:border-green-300 transition-all duration-200 font-semibold text-green-700 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Store size={18} className="text-green-600" />
                  </div>
                  <span className="text-sm">Demo Vendor</span>
                </button>
              </div>

              <p className="mt-2 text-xs text-center text-gray-500">
                Click to load credentials, then sign in
              </p>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600 pb-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              state={from}
              className="font-semibold text-purple-600 hover:text-purple-700 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <Lock size={12} />
            <span>Your data is secure and encrypted</span>
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;