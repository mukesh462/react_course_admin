import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  categoryName: Yup.string()
    .required('Category Name is required')
    .min(2, 'Category Name must be at least 2 characters long'),
  status: Yup.boolean().required('Status is required'),
});

const CategoryForm = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow bg-white">
      
      <Formik
        initialValues={{ categoryName: '', status: false }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('Form Data', values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-6">
              <label htmlFor="categoryName" className="block font-bold">
                Category Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="categoryName"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage name="categoryName" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="status" className="block font-bold">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center mt-2">
                <span className="mr-3 text-gray-700">Inactive</span>
                <div className="relative inline-block w-11 h-5">
                  <Field
                    type="checkbox"
                    name="status"
                    id="switch-component"
                    className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-[#31ABEB] cursor-pointer transition-colors duration-300"
                    checked={isActive}
                    onChange={(e) => {
                      setIsActive(e.target.checked);
                      setFieldValue('status', e.target.checked);
                    }}
                  />
                  <label
                    htmlFor="switch-component"
                    className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                  />
                </div>
                <span className="ml-3 text-gray-700">Active</span>
              </div>
              <ErrorMessage name="status" component="div" className="text-red-600 text-sm mt-1" />
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

export default CategoryForm;
