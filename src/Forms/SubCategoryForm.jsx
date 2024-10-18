import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  category: Yup.string().required('Category is required'),
  subCategoryName: Yup.string()
    .required('Sub Category Name is required')
    .min(2, 'Sub Category Name must be at least 2 characters long'),
});

const SubCategoryForm = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow bg-white">
      <Formik
        initialValues={{ category: '', subCategoryName: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('Form Data', values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-6">
              <label htmlFor="category" className="block font-bold">
                Category <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="category"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              >
                <option value="">Select a category</option>
                <option value="Category A">Category A</option>
                <option value="Category B">Category B</option>
                <option value="Category C">Category C</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="subCategoryName" className="block font-bold">
                Sub Category Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="subCategoryName"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage name="subCategoryName" component="div" className="text-red-600 text-sm mt-1" />
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

export default SubCategoryForm;
