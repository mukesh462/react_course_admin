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
});

const MyForm = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      {/* <h1 className="text-xl font-semibold mb-4">Registration Form</h1> */}
      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          // Simulate submission
          setTimeout(() => {
            console.log('Form Data', values);
            setSubmitting(false);
            // Optionally, set an error state for demonstration
            setErrors({ email: 'Email already exists' });
          }, 400);
        }}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="col-12">
                <label htmlFor="name" className="block text-gray-700">Batch Code</label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                />
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
              </div>

             
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={resetForm} // Resets the form fields
                className="w-full bg-gray-300 text-gray-700 p-2 rounded-md mr-2 hover:bg-gray-400"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-500 text-white p-2 rounded-md ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
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

export default MyForm;
