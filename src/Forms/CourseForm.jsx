import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Sample data for categories and subcategories
const categories = {
  "Category A": ["Sub Category A1", "Sub Category A2", "Sub Category A3"],
  "Category B": ["Sub Category B1", "Sub Category B2"],
  "Category C": ["Sub Category C1", "Sub Category C2", "Sub Category C3"],
};

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub Category is required"),
  courseName: Yup.string().required("Course Name is required"),
});

const CourseForm = () => {
  const [subCategories, setSubCategories] = useState([]);

  const handleCategoryChange = (setFieldValue, category) => {
    setFieldValue("category", category);
    setFieldValue("subCategory", ""); // Reset subcategory when category changes
    setSubCategories(categories[category] || []);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow bg-white">
      <Formik
        initialValues={{
          category: "",
          subCategory: "",
          courseName: "",
          status: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("Form Data", values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-6">
              <label htmlFor="courseName" className="block font-bold">
                Course Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="courseName"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage
                name="courseName"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="category" className="block font-bold">
                Category <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="category"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                onChange={(e) =>
                  handleCategoryChange(setFieldValue, e.target.value)
                }
              >
                <option value="">Select a category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subCategory" className="block font-bold">
                Sub Category <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="subCategory"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                disabled={!subCategories.length}
              >
                <option value="">Select a sub category</option>
                {subCategories.map((subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="subCategory"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="mb-6 flex items-center">
              <label htmlFor="status" className="block font-bold mr-3">
                Status  <span className="text-red-500">*</span>
              </label>
              <br />
              <div className="relative inline-block w-11 h-5">
                <input
                  type="checkbox"
                  id="switch-component"
                  name="status"
                  checked={values.status}
                  onChange={() => setFieldValue("status", !values.status)}
                  className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-[#31ABEB] cursor-pointer transition-colors duration-300"
                />
                <label
                  htmlFor="switch-component"
                  className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                ></label>
              </div>
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

export default CourseForm;
