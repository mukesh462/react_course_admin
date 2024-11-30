import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../components/useApi";
import toast from "react-hot-toast";



const validationSchema = Yup.object().shape({
  category_id: Yup.string().required("Category is required"),
  subcategory_id: Yup.string().required("Sub Category is required"),
  course_name: Yup.string().required("Course Name is required"),
});

const CourseForm = () => {
  const [subCategories, setSubCategories] = useState([]);

  const handleCategoryChange = (setFieldValue, category) => {
    setFieldValue("category_id", category);
    setFieldValue("subcategory_id", ""); 
    getSubCategory(category)
  };
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);
  const { request } = useApi();
  const navigate = useNavigate();
  const [category, setcategory] = useState([]);

  const [data, setData] = useState({ category_id: '', subcategory_id: '',course_name:"",status:"1"});
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("get", "course/" + id);
      if (response.status) {
        getSubCategory(response.data.category_id)
        setIsActive(response.data.status === '1'? true : false)
        setData(response.data);
      }
    };
    if (id !== undefined) {
      fetchData();
    }
    getCategory()
  }, [id]);

  const getCategory = async ()=>{
    const response = await request("post", "category/getlist");
    if (response.status) {
     setcategory(response.data);
    }
  }
  const getSubCategory = async (id)=>{
    const response = await request("post", "subcategory/getallsubcategory_by_id",{
      category_id:id
    });
    if (response.status) {
     setSubCategories(response.data);
    }
  }
  const submitForm = async (values, { setSubmitting, setErrors }) => {
    try {
      const postUrl = id ? "course/update/" + id:"course/create";
     const res= await request("post", postUrl, values );
      toast.success(res.message);
      navigate('/course')
      
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow bg-white">
      <Formik
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        enableReinitialize={true}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-6">
              <label htmlFor="course_name" className="block font-bold">
                Course Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="course_name"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage
                name="course_name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="category_id" className="block font-bold">
                Category <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="category_id"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                onChange={(e) =>
                  handleCategoryChange(setFieldValue, e.target.value)
                }
              >
                <option value="">Select a Category</option>
                {category.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category_id"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subcategory_id" className="block font-bold">
                Sub Category <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="subcategory_id"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                // disabled={subCategories.length ==0}
              >
                <option value="">Select a sub category</option>
                {subCategories.map((subCat) => (
                  <option key={subCat._id} value={subCat._id}>
                    {subCat.subcategory_name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="subcategory_id"
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
                  checked={values.status == 1 }
                  onChange={(e) => setFieldValue("status", e.target.checked ? 1:0)}
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
