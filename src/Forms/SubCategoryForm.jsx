import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../components/useApi';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  category_id: Yup.string().required('Category is required'),
  subcategory_name: Yup.string()
    .required('Sub Category Name is required')
    .min(2, 'Sub Category Name must be at least 2 characters long'),
    status:Yup.string().required("Status is required")
});

const SubCategoryForm = () => {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);
  const { request } = useApi();
  const navigate = useNavigate();
  const [category, setcategory] = useState([]);

  const [data, setData] = useState({ category_id: '', subcategory_name: '',status:"1"});
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("get", "subcategory/" + id);
      if (response.status) {
      
        setIsActive(response.data.status == "1"? true : false)
        setData(response.data);
      }
    };
    if (id !== undefined) {
      fetchData();
    }
    getCategory()
  }, [id]);

  const getCategory = async ()=>{
    const response = await request("post", "category/list");
    if (response.status) {
     setcategory(response.data);
    }
  }
  const submitForm = async (values, { setSubmitting, setErrors }) => {
    try {
      const postUrl = id ? "subcategory/update/" + id:"subcategory/create";
      await request("post", postUrl, values );
      toast.success("Success");
      navigate('/Subcategory')
      
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
        {({ isSubmitting ,setFieldValue}) => (
          <Form>
            <div className="mb-6">
              <label htmlFor="category" className="block font-bold">
                Category <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="category_id"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              >
                <option value="">Select a Category</option>
            {
              category.map((e)=>{
                return <option value={e._id}>{e.category_name}</option>
              })
            }
              </Field>
              <ErrorMessage name="category_id" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="subcategory_name" className="block font-bold">
                Sub Category Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="subcategory_name"
                className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
              />
              <ErrorMessage name="subcategory_name" component="div" className="text-red-600 text-sm mt-1" />
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
                      setFieldValue('status', e.target.checked ? 1 : 0);
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

export default SubCategoryForm;
