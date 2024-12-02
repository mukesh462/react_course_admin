import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { FaPlusCircle } from "react-icons/fa";
import useApi from "../components/useApi";
import NormalSelect from "../components/Select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const validationSchema = Yup.object().shape({
  assessment_type: Yup.string().required("Assessment Type is required"),
  particular_id: Yup.object().shape().required("Particular ID is required"),
  start_date: Yup.date().required("Start Date is required"),
  end_date: Yup.date().required("End Date is required"),
  start_time: Yup.string().required("Start Time is required"),
  end_time: Yup.string().required("End Time is required"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        question_type: Yup.string().required("Question Type is required"),
        question_text: Yup.string().required("Question is required"),
        numberOf: Yup.string().test(
          "count-required",
          "Box count is required min value is 1",
          function (value) {
            const { question_type } = this.parent;
            if (question_type === "input") {
              return value && value != "" && parseInt(value) > 0;
            }
            return true;
          }
        ),
        // Conditionally validate options if the question_type is "choose"
        options: Yup.array().test(
          "options-required",
          "At least 2 options are required for 'choose' type questions",
          function (value) {
            const { question_type } = this.parent;
            if (question_type === "choose") {
              return value && value.length >= 2;
            }
            return true;
          }
        ),
      })
    )
    .required("At least one question is required"),
});

const AssessmentForm = () => {
  const [assessmentType, setAssessmentType] = useState(true); // Default type is 'student'
  const [batch, setBatch] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const { request } = useApi();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getBatchAndStudentData();
  }, []);
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
      }

      if (studentResponse.status) {
        const studentOptions = studentResponse.data.map((student) => ({
          label: student.name,
          value: student._id,
        }));
        setStudentData(studentOptions);
      }
    } catch (error) {
      console.error("Error fetching batch or student data:", error);
    }
  };
  const submitForm = async (values, { setSubmitting, setErrors }) => {
    try {
      const postUrl = "task/create";

      const response = await request("post", postUrl, {
        ...values,
        questions: values.questions.map((e) => ({ ...e, id: uuidv4() })),
      });
      if (response.status) {
        toast.success(response.message);
        navigate("/assessment");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className=" mx-auto mt-10 p-5 border rounded shadow bg-white">
      <Formik
        initialValues={{
          assessment_type: "student",
          particular_id: "",
          start_date: null,
          end_date: null,
          start_time: null,
          end_time: null,
          questions: [
            {
              question_type: "input",
              question_text: "",
              options: [],
              numberOf: 1,
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="">
                <div className="mb-4">
                  <label className="block font-bold">Assessment Type</label>
                  <Field
                    as="select"
                    name="assessment_type"
                    className="mt-2 block w-full border rounded-md p-2"
                    onChange={(e) => {
                      const type = e.target.value;
                      setFieldValue("assessment_type", type);
                      setAssessmentType(type === "student");
                      setFieldValue("particular_id", "");
                    }}
                  >
                    <option value="student" selected>
                      Student
                    </option>
                    <option value="batch">Batch</option>
                  </Field>
                  <ErrorMessage
                    name="assessment_type"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="particular_id" className="block font-bold">
                    {assessmentType ? "Student" : "Batch"}
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="particular_id"
                    component={NormalSelect}
                    onChange={(selected) => {
                      setFieldValue("particular_id", selected || ""); // Default to empty string if undefined
                    }}
                    value={values.particular_id}
                    options={assessmentType ? studentData : batch}
                    placeholder="Select option"
                  />

                  <ErrorMessage
                    name="particular_id"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="grid grid-col-1 md:grid-cols-2 mt-2 gap-2">
                  <div>
                    <label htmlFor="date" className="block font-bold">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <Flatpickr
                      name="start_date"
                      className="mt-2 block w-full border rounded-md p-2"
                      value={values.start_date}
                      onChange={(date) => setFieldValue("start_date", date[0])}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <ErrorMessage
                      name="start_date"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="end_date" className="block font-bold">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <Flatpickr
                      name="end_date"
                      className="mt-2 block w-full border rounded-md p-2"
                      value={values.end_date}
                      onChange={(date) => setFieldValue("end_date", date[0])}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <ErrorMessage
                      name="end_date"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
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
                </div>
              </div>
              <div className="max-h-[500px] min-h-[450px] overflow-y-scroll">
                <FieldArray name="questions">
                  {({ push, remove }) => (
                    <div>
                      {values.questions.map((question, index) => (
                        <div key={index} className="mb-4 border p-3 rounded-md">
                          <div className="mb-2">
                            <label className="block font-bold">
                              Question Type
                            </label>
                            <Field
                              as="select"
                              name={`questions[${index}].question_type`}
                              className="mt-2 block w-full border rounded-md p-2"
                              onChange={(e) => {
                                const type = e.target.value;
                                setFieldValue(
                                  `questions[${index}].question_type`,
                                  type
                                );
                                if (type === "input") {
                                  setFieldValue(
                                    `questions[${index}].options`,
                                    []
                                  );
                                }
                              }}
                            >
                              <option value="input">Select Input</option>
                              <option value="choose">Choose Options</option>
                            </Field>
                          </div>

                          {/* Question Text Field */}
                          <div className="mb-2">
                            <label className="block font-bold">Question</label>
                            <Field
                              name={`questions[${index}].question_text`}
                              placeholder="Write your question here"
                              className="mt-2 block w-full border rounded-md p-2"
                            />
                            {values.questions[index].question_type ===
                              "input" && (
                              <>
                                <div className="flex items-center justify-start">
                                  <Field
                                    type="number"
                                    min="0"
                                    name={`questions[${index}].numberOf`}
                                    placeholder="Box Count"
                                    className="mt-2 block  border rounded-md p-2 w-[30%] "
                                  />
                                  <button
                                    type="button"
                                    className="mx-3 p-2 text-xs bg-red-500  text-white rounded"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </button>
                                </div>

                                <ErrorMessage
                                  name={`questions[${index}].numberOf`}
                                  component="div"
                                  className="text-red-600 text-sm mt-1"
                                />
                              </>
                            )}

                            <ErrorMessage
                              name={`questions[${index}].question_text`}
                              component="div"
                              className="text-red-600 text-sm mt-1"
                            />
                          </div>

                          {/* Options (Only if 'choose' type) */}
                          {values.questions[index].question_type ===
                            "choose" && (
                            <>
                              <div>
                                <label className="block font-bold mb-2">
                                  Options
                                </label>
                                <FieldArray
                                  name={`questions[${index}].options`}
                                >
                                  {({
                                    push: pushOption,
                                    remove: removeOption,
                                  }) => (
                                    <div>
                                      {values.questions[index].options.map(
                                        (option, optIndex) => (
                                          <div
                                            key={optIndex}
                                            className="flex items-center mb-2"
                                          >
                                            <Field
                                              name={`questions[${index}].options[${optIndex}]`}
                                              placeholder={`Option ${
                                                optIndex + 1
                                              }`}
                                              className="mr-2 p-2 border rounded-md flex-grow"
                                            />
                                            <button
                                              type="button"
                                              className="px-2 py-1 bg-red-500 text-white rounded"
                                              onClick={() =>
                                                removeOption(optIndex)
                                              }
                                            >
                                              X
                                            </button>
                                          </div>
                                        )
                                      )}

                                      <button
                                        type="button"
                                        className="mt-2 p-2 text-xs my-2 bg-blue-500 text-white rounded"
                                        onClick={() => pushOption("")}
                                      >
                                        Add Option
                                      </button>
                                    </div>
                                  )}
                                </FieldArray>
                              </div>
                              <button
                                type="button"
                                className="mx-3 p-2 text-xs bg-red-500  text-white rounded"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        className="mt-2 p-1 flex justify-center items-center gap-2 text-sm bg-green-500 text-white rounded"
                        onClick={() =>
                          push({
                            question_type: "input",
                            question_text: "",
                            options: [],
                            numberOf: 1,
                          })
                        }
                      >
                        <FaPlusCircle /> Question
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>

            {/* Questions */}

            <div className="flex justify-center mt-6">
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

export default AssessmentForm;
