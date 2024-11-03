import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../components/useApi";
import FileUpload from "../components/FileUpload";
import Switch from "react-switch";
import toast from "react-hot-toast";
import { IoChevronBackCircleOutline } from "react-icons/io5";


const MyStudentForm = () => {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);
  const { request } = useApi();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    pwd: "",
    pnumber: "",
    profile: null,
    batch_id: "",
    isAdmin: "",
    dateofjoining: new Date().toUTCString(),
    status: 1,
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    pwd: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    pnumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits long"), // Change regex as needed
    batch_id: Yup.string().required("Batch is required"),
    dateofjoining: Yup.string().required("DOJ is required"),
  });
  const [batch, setbatch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await request("get", "student/" + id);
      if (response.status) {
        const { data } = response;
       
        setData(data);
      }
    };
    if (id !== undefined) {
      fetchData();
    }
    getbatch();
  }, [id]);
  const getbatch = async () => {
    const response = await request("get", "batch/getAllBatchData");
    if (response.status) {
      setbatch(response.data);
    }
  };
  const submitForm = async (values, { setSubmitting, setErrors }) => {
    try {
      const postUrl = id ? "student/update/" + id : "student/create";
      const res = await request("post", postUrl, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status) {
        toast.success(res.message);
        navigate("/student");
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="mt-5">
        <button
          onClick={() => navigate("/student")}
          className="btn btn-secondary flex gap-2 items-center justify-center"
        >
          <IoChevronBackCircleOutline size={20} /> Back
        </button>
      </div>
      <div className="max-w-[90%] mx-auto mt-10 p-5 border rounded shadow bg-white">
        <Formik
          initialValues={data}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={submitForm}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="col-12">
                  <label htmlFor="name" className="block font-bold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
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
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="password" className="block font-bold">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="password"
                    name="pwd"
                    className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                  />
                  <ErrorMessage
                    name="pwd"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="pnumber" className="block font-bold">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="pnumber"
                    className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                  />
                  <ErrorMessage
                    name="pnumber"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="profile" className="block font-bold">
                    Profile <span className="text-red-500">*</span>
                  </label>
                  <FileUpload
                    files={values.profile ? [values.profile] : []}
                    setFiles={(file) => setFieldValue("profile", file)}
                  />
                  <ErrorMessage
                    name="profile"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="batch_id" className="block font-bold">
                    Batch <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="batch_id"
                    className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:shadow-[0_0_5px_#31ABEB]"
                  >
                    <option value="">Select a Batch</option>
                    {batch.map((batch) => (
                      <option key={batch._id} value={batch._id}>
                        {batch.batch_name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="batch_id"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="col-6">
                  <label className="block font-bold">isAdmin </label>
                  <div className="flex items-center mt-2">
                    <Switch
                      checked={values.isAdmin ==1 ?true :false}
                      onChange={(e) => {
                        setFieldValue("isAdmin", e ? 1 : 0);
                      }}
                      offColor="#888"
                      onColor="#31ABEB"
                      className="mr-2"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label className="block font-bold">Status </label>
                  <div className="flex items-center mt-2">
                    <Switch
                      checked={values.status == 1 ? true :false}
                      onChange={(e) => {
                        setFieldValue("status", e ? 1 : 0);
                      }}
                      offColor="#888"
                      onColor="#31ABEB"
                      className="mr-2"
                    />
                  </div>
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
                  className={` bg-[#31ABEB] text-white p-2 rounded-md ${
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
    </>
  );
};

export default MyStudentForm;
