import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Switch from "react-switch";
import * as Yup from "yup";
import SelectSearch from "../components/SelectSearch";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../components/useApi";
import toast from "react-hot-toast";
import Select from "../components/Select";
import NormalSelect from "../components/Select";


const validationSchema = Yup.object().shape({
  topic_name: Yup.string().required("Topic Name is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
  start_time: Yup.string().required("Start Time is required"),
  end_time: Yup.string().required("End Time is required"),
  instructor_id: Yup.string().required("Instructor is required"),
  batch_or_student_id: Yup.string().required(
    "This field is required based on class type"
  ),
});
const ClassForm = () => {
  const [classType, setClassType] = useState(true);
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);
  const { request } = useApi();

  const navigate = useNavigate();
  const [data, setData] = useState({
    topic_name: "",
    description: "",
    short_description: "",
    date: new Date(),
    start_time: "",
    end_time: "",
    instructor_id: "",
    class_type: true,
    zoomLink: "",
    recordingUrl: "",
    batch_or_student_id: "",
    materials: [], // Start with an empty materials array
  });
  const [batch, setBatch] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch class data and then fetch batch and student data
    const initializeData = async () => {
      if (id) {
        await fetchData();
      }
      await getBatchAndStudentData();
      getInstructors();
    };
    initializeData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await request("get", `myclass/${id}`);
      if (response.status) {
        const classData = response.data;
        setData((prevData) => ({
          ...prevData,
          ...classData,
          class_type: classData.class_type,
        }));
        setClassType(classData.class_type === 1);
      }
    } catch (error) {
      console.error("Error fetching dclass data:", error);
    }
  };

  const getInstructors = async () => {
    try {
      const response = await request("get", "instructor/get-all-instructor");
      if (response.status) {
        setInstructors(response.data);
      }
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const getBatchAndStudentData = async () => {
    try {
      const [batchResponse, studentResponse] = await Promise.all([
        request("get", "batch/getAllBatchData"),
        request("get", "student/allStudent"),
      ]);

      if (batchResponse.status) {
        const batchOptions = batchResponse.data.map((batch) => ({
          label: batch.batch_name,
          value: batch._id,
        }));
        setBatch(batchOptions);

        if (data.batch_or_student_id) {
          const selectedBatch = batchOptions.find(
            (batch) => batch.value === data.batch_or_student_id
          );
          if (selectedBatch) {
            setData((prevData) => ({
              ...prevData,
              batch_or_student_id: selectedBatch,
            }));
          }
        }
      }

      if (studentResponse.status) {
        const studentOptions = studentResponse.data.map((student) => ({
          label: student.name,
          value: student._id,
        }));
        setStudentData(studentOptions);

        if (data.batch_or_student_id) {
          const selectedStudent = studentOptions.find(
            (student) => student.value === data.batch_or_student_id
          );
          if (selectedStudent) {
            setData((prevData) => ({
              ...prevData,
              batch_or_student_id: selectedStudent,
            }));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching batch or student data:", error);
    }
  };

  useEffect(() => {
    const updateBatchOrStudentSelection = (options, key) => {
      if (options.length > 0 && data.batch_or_student_id) {
        const selectedOption = options.find(
          (option) => option.value === data.batch_or_student_id
        );
        if (selectedOption) {
          setData((prevData) => ({
            ...prevData,
            [key]: selectedOption,
          }));
        }
      }
    };

    updateBatchOrStudentSelection(batch, "batch_or_student_id");
    updateBatchOrStudentSelection(studentData, "batch_or_student_id");
  }, [batch, studentData, data.batch_or_student_id]);

  const submitForm = async (values, { setSubmitting, setErrors }) => {
    const sendpost = {
      ...values,
      batch_or_student_id: values.batch_or_student_id?.value,
      materials: values.materials.map((e) => e.value),
    };
    console.log(sendpost);
    try {
      const postUrl = id ? "myclass/update/" + id : "myclass/create";
      const res = await request("post", postUrl, sendpost);
      if (res.status) {
        toast.success(res.message);
        navigate("/class");
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
    <div className="max-w-5xl mx-auto mt-10 p-5 border rounded shadow bg-white">
      <h1 className="text-xl font-semibold mb-4">Class Form</h1>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ isSubmitting, setFieldValue, values }) => {
          return (
            <Form>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Topic Name */}
                <div>
                  <label htmlFor="topic_name" className="block font-bold">
                    Topic Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="topic_name"
                    className="mt-2 block w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="topic_name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block font-bold">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <Flatpickr
                    name="date"
                    className="mt-2 block w-full border rounded-md p-2"
                    value={values.date}
                    onChange={(date) => setFieldValue("date", date[0])}
                    options={{ dateFormat: "Y-m-d" }}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Instructor */}
                <div>
                  <label htmlFor="instructor_id" className="block font-bold">
                    Instructor <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="instructor_id"
                    className="mt-2 block w-full border rounded-md p-2"
                    value={values.instructor_id}
                  >
                    <option value="">Select Instructor</option>
                    {instructors.map((instructor) => (
                      <option key={instructor.id} value={instructor._id}>
                        {instructor.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="instructor_id"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label htmlFor="start_time" className="block font-bold">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <Flatpickr
                    name="start_time"
                    className="mt-2 block w-full border rounded-md p-2"
                    value={values.start_time}
                    onChange={(time) => setFieldValue("start_time", time[0])}
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: "H:i",
                      time_24hr: true,
                    }}
                  />
                  <ErrorMessage
                    name="start_time"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label htmlFor="end_time" className="block font-bold">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <Flatpickr
                    name="end_time"
                    className="mt-2 block w-full border rounded-md p-2"
                    value={values.end_time}
                    onChange={(time) => setFieldValue("end_time", time[0])}
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: "H:i",
                      time_24hr: true,
                    }}
                  />
                  <ErrorMessage
                    name="end_time"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Class Type */}
                <div>
                  <label className="block font-bold">Class Type</label>
                  <div className="flex items-center mt-2">
                    <span className="mr-2">Individual</span>
                    <Switch
                      checked={classType}
                      onChange={(e) => {
                        setClassType(e);
                        setFieldValue("class_type", e ? 1 : 2);
                        setFieldValue("batch_or_student_id", "");
                      }}
                      offColor="#888"
                      onColor="#31ABEB"
                      className="mr-2"
                    />
                    <span>Batch</span>
                  </div>
                </div>

                {/* Batch or Student */}
                <div>
                  <label
                    htmlFor="batch_or_student_id"
                    className="block font-bold"
                  >
                    {classType ? "Batch" : "Student"}
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="batch_or_student_id"
                    component={NormalSelect}
                    onChange={(selected) => {
                      console.log("Batch or Student ID selected:", selected);
                      setFieldValue("batch_or_student_id", selected || ""); // Default to empty string if undefined
                    }}
                    value={values.batch_or_student_id}
                    options={classType ? batch : studentData}
                    placeholder="Select option"
                  />

                  <ErrorMessage
                    name="batch_or_student_id"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block font-bold">
                    Description
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className="mt-2 block w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label
                    htmlFor="short_description"
                    className="block font-bold"
                  >
                    Short Description
                  </label>
                  <Field
                    type="text"
                    name="short_description"
                    className="mt-2 block w-full border rounded-md p-2"
                  />
                </div>
              </div>

              {/* Zoom Link and Recording URL */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="zoomLink" className="block font-bold">
                    Zoom Link
                  </label>
                  <Field
                    type="text"
                    name="zoomLink"
                    className="mt-2 block w-full border rounded-md p-2"
                  />
                </div>

                <div>
                  <label htmlFor="recordingUrl" className="block font-bold">
                    Recording URL
                  </label>
                  <Field
                    type="text"
                    name="recordingUrl"
                    className="mt-2 block w-full border rounded-md p-2"
                  />
                </div>
              </div>

              {/* Materials FieldArray */}
              <div className="mb-4 mx-w-[50%]">
                <label className="block font-bold">Materials</label>
                <Field
                  name="materials"
                  component={SelectSearch}
                  onChange={(selected) => setFieldValue("materials", selected)}
                  value={values.materials}
                  url="materialLink/search"
                  placeholder="Select materials"
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
          );
        }}
      </Formik>
    </div>
  );
};

export default ClassForm;
