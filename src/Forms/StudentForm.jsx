import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits long'), // Change regex as needed
  batch: Yup.string()
    .required('Batch is required'),
});

const MyStudentForm = () => {
  return (
    <div className="max-w-[90%] mx-auto mt-10 p-5 border rounded shadow bg-white">
      <Formik
        initialValues={{ name: '', email: '', password: '', phoneNumber: '', profileImage: null, batch: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Simulate submission
          setTimeout(() => {
            console.log('Form Data', values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-2 gap-6 mb-4"> {/* Increased spacing here */}
              <div className="col-12">
                <label htmlFor="name" className="block font-bold">
                  Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                />
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="col-12">
                <label htmlFor="email" className="block font-bold">
                  Email <span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="col-12">
                <label htmlFor="password" className="block font-bold">
                  Password <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="password"
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="col-12">
                <label htmlFor="phoneNumber" className="block font-bold">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="col-12">
                <label htmlFor="profileImage" className="block font-bold">Profile Image (Optional)</label>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("profileImage", event.currentTarget.files[0]);
                  }}
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                />
              </div>

              <div className="col-12">
                <label htmlFor="batch" className="block font-bold">
                  Batch <span className="text-red-500">*</span>
                </label>
                <Field as="select" name="batch" className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]">
                  <option value="">Select a batch</option>
                  <option value="Batch A">Batch A</option>
                  <option value="Batch B">Batch B</option>
                  <option value="Batch C">Batch C</option>
                </Field>
                <ErrorMessage name="batch" component="div" className="text-red-600 text-sm mt-1" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="reset"
                className=" bg-orange-400 text-white  p-2 rounded-md mr-2 "
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={` bg-[#31ABEB] text-white p-2 rounded-md ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
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

export default MyStudentForm;
