import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FileUpload from '../components/FileUpload'; 

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number is not valid')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
//   profileImage: Yup.mixed().required('Profile image is required'),
});

const ProfileForm = () => {
  const [profileImage, setProfileImage] = useState([]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow bg-white">
      <h1 className="text-xl font-semibold mb-4">Profile Form</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          phoneNumber: '',
          profileImage: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('Form Data', values);
            console.log('Profile Image',profileImage ); 
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-6">
              <label htmlFor="name" className="block font-bold">
                Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="name"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="profileImage" className="block font-bold">
                Profile Image <span className="text-red-500">*</span>
              </label>
              <FileUpload
                files={profileImage}
                setFiles={setProfileImage} 
              />
              <ErrorMessage name="profileImage" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block font-bold">
                Email <span className="text-red-500">*</span>
              </label>
              <Field
                type="email"
                name="email"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block font-bold">
                Password <span className="text-red-500">*</span>
              </label>
              <Field
                type="password"
                name="password"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="phoneNumber" className="block font-bold">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="phoneNumber"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="reset"
                className="bg-orange-400 text-white p-2 rounded-md mr-2"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#31ABEB] text-white p-2 rounded-md ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
