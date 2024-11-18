import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
import { RiStethoscopeLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../components/useApi";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/LoginSlice";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { request } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    pwd: Yup.string().required("Password is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      pwd: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const postUrl = "auth/login";
        const response = await request("post", postUrl, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status) {
          navigate("/");
          toast.success(response.message);
          dispatch(login(response.data));
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("An error occurred while logging in.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundColor: "rgba(49, 171, 235, 0.1)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <RiStethoscopeLine className="h-12 w-12 text-[#31ABEB]" />
              </div>
              <h2 className="text-2xl font-bold text-center text-[#31ABEB]">
                Groww Together
              </h2>
              <p className="text-center text-gray-600">
                Enter your credentials to access your medical dashboard
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                      formik.errors.email && formik.touched.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#31ABEB]"
                    } focus:outline-none`}
                    id="email"
                    placeholder="Email"
                    type="email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    className={`w-full pl-10 pr-10 py-2 rounded-md border ${
                      formik.errors.pwd && formik.touched.pwd
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#31ABEB]"
                    } focus:outline-none`}
                    id="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    {...formik.getFieldProps("pwd")}
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
                  {formik.touched.pwd && formik.errors.pwd && (
                    <p className="text-sm text-red-500 mt-1">
                      {formik.errors.pwd}
                    </p>
                  )}
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
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#31ABEB] hover:bg-[#2b99d1] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
