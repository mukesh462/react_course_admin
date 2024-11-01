import { useState } from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa'
import { RiStethoscopeLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'


export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12 sm:px-6 lg:px-8" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundColor: 'rgba(49, 171, 235, 0.1)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <RiStethoscopeLine className="h-12 w-12 text-[#31ABEB]" />
            </div>
            <h2 className="text-2xl font-bold text-center text-[#31ABEB]">MediLogin</h2>
            <p className="text-center text-gray-600">
              Enter your credentials to access your medical dashboard
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:border-transparent"
                  id="email"
                  placeholder="Email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:border-transparent"
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                  type="button"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4 text-gray-400" />
                  ) : (
                    <FaEye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-gray-300 text-[#31ABEB] focus:ring-[#31ABEB]"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-gray-700"
              >
                Remember me
              </label>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 space-y-4">
          <button className="w-full bg-[#31ABEB] hover:bg-[#2b99d1] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
          <div className="flex justify-center text-sm">
            <Link className="text-[#31ABEB] hover:text-[#2b99d1]" href="#">
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#31ABEB]">
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#31ABEB]">
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}