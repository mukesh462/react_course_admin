import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useApi from "../components/useApi";
import toast from "react-hot-toast";
import FileUpload from "../components/FileUpload";
import { useNavigate, useParams } from "react-router-dom";
import { UrltoFile } from "../components/Utilities";
import { IoChevronBackCircleOutline } from "react-icons/io5";



const InstructorForm = () => {
  const { id } = useParams();
  const { request } = useApi();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    role: "",
    file: null,
    ratings: 3,
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role Name is required"),
    file: Yup.mixed()
      .required("Profile is required")
      .test("fileSize", "File size is too large, maximum size is 2MB", (value) => {
        console.log(typeof value,'vaa')

        return typeof value == "string"? true: typeof value =='object'&& value.size <= 2 * 1024 * 1024;
      }),
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("get", "instructor/" + id);
      if (response.status) {
        const {data} = response;
        setData({file: process.env.REACT_APP_IMAGE + data.profile
        ,...data});
      }
    };
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

  const submitForm = async (values, { setSubmitting, setErrors }) => {
    try {
      const postUrl = id ? "instructor/update/" + id:"instructor/create";
      await request("post", postUrl, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Success");
      navigate('/instructor')
      
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
       <div className="mt-5">
        <button onClick={()=> navigate("/instructor")} className="btn btn-secondary flex gap-2 items-center justify-center"><IoChevronBackCircleOutline size={20} /> Back</button>
      </div>
       <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow bg-white">
     
      <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Field type="hidden" name="ratings" />

            <div className="mb-4">
              <label htmlFor="name" className="block font-bold">
                Instructor Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="name"
                className="mt-2 block w-full border rounded-md p-2"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block font-bold">
                Role Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="role"
                className="mt-2 block w-full border rounded-md p-2"
              />
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="profile" className="block font-bold">
                Profile <span className="text-red-500">*</span>
              </label>
              <FileUpload
                files={values.file ? [values.file] : []}
                setFiles={(file) => setFieldValue("file", file)}
              />
              <ErrorMessage
                name="file"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
              
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
    </div>
   
  );
};

export default InstructorForm;
