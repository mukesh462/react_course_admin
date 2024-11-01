import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useApi from "../components/useApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import FileUpload from "../components/FileUpload";

const validationSchema = Yup.object().shape({
  material_name: Yup.string().required("Material Name is required"),
  filelink: Yup.mixed().required("File is required"),
  // .test(
  //   "fileSize",
  //   "File size is too large, maximum size is 2MB",
  //   (value) => {
  //     return value && value.size <= 2 * 1024 * 1024;
  //   }
  // ),
});

const MaterialLinkForm = () => {
  const { id } = useParams();
  const { request } = useApi();
  const navigate = useNavigate();
  const [data, setData] = useState({
    material_name: "",
    filelink: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await request("get", "materialLink/" + id);
      if (response.status) {
        setData(response.data);
      }
    };
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

  const submitForm = async (values, { setSubmitting, setErrors }) => {
    try {
      const postUrl = id ? "materialLink/update/" + id : "materialLink/create";
      const res = await request("post", postUrl, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status) {
        toast.success(res.message);
        navigate("/materialLink");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <div className="mt-5">
        <button
          onClick={() => navigate("/material")}
          className="btn btn-secondary flex gap-2 items-center justify-center"
        >
          <IoChevronBackCircleOutline size={20} /> Back
        </button>
      </div>
      <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow bg-white">
        <Formik
          initialValues={data}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={submitForm}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="mb-6">
                <label htmlFor="material_name" className="block font-bold">
                  Material Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="material_name"
                  className="mt-2 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                />
                <ErrorMessage
                  name="material_name"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="filelink" className="block font-bold">
                  File <span className="text-red-500">*</span>
                </label>
                <FileUpload
                  files={values.filelink ? [values.filelink] : []}
                  setFiles={(file) => setFieldValue("filelink", file)}
                />
                <ErrorMessage
                  name="filelink"
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

export default MaterialLinkForm;
