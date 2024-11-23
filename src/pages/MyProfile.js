import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FileUpload from "../components/FileUpload";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  pwd: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  pnumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
});

const ProfileForm = () => {
  const [profileImage, setProfileImage] = useState([]);
  const isLoggedIn = useSelector((state) => state.login.user);
  
  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 border rounded shadow bg-white">
      <h1 className="text-2xl font-semibold mb-6">Profile Form</h1>
      <Formik
        initialValues={isLoggedIn}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("Form Data", values);
            console.log("Profile Image", profileImage);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="grid grid-cols-6 gap-4">
            {/* Name */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="name" className="block font-bold">
                Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="name"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Profile */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="profile" className="block font-bold">
                Profile <span className="text-red-500">*</span>
              </label>
              <FileUpload
                files={values.profile ? [values.profile] : []}
                setFiles={(file) => setFieldValue("profile", file)}
              />
              <ErrorMessage
                name="profile"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="email" className="block font-bold">
                Email <span className="text-red-500">*</span>
              </label>
              <Field
                type="email"
                name="email"
                disabled
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none cursor-not-allowed focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="password" className="block font-bold">
                Password <span className="text-red-500">*</span>
              </label>
              <Field
                type="password"
                name="pwd"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage
                name="pwd"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="pnumber" className="block font-bold">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="pnumber"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage
                name="pnumber"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Buttons */}
            <div className="col-span-6 flex justify-end mt-4">
              <button
                type="reset"
                className="bg-orange-400 text-white p-2 rounded-md mr-2"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#31ABEB] text-white p-2 rounded-md ${
                  isSubmitting && "opacity-50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
