import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  assessment_type: Yup.string().required("Assessment Type is required"),
  particular_id: Yup.string().required("Particular ID is required"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        question_type: Yup.string().required("Question Type is required"),
        question_text: Yup.string().required("Question is required"),
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
  const [assessmentType, setAssessmentType] = useState("student"); // Default type is 'student'

  const particularOptions = {
    student: ["Student 1", "Student 2", "Student 3"],
    batch: ["Batch A", "Batch B", "Batch C"],
  };

  return (
    <div className=" mx-auto mt-10 p-5 border rounded shadow bg-white">
      <Formik
        initialValues={{
          assessment_type: "student",
          particular_id: "",
          questions: [
            { question_type: "input", question_text: "", options: [] },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form Data", values);
          setSubmitting(false);
          alert("Form submitted successfully!");
        }}
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
                      setAssessmentType(type);
                      setFieldValue("particular_id", "");
                    }}
                  >
                    <option value="student">Student</option>
                    <option value="batch">Batch</option>
                  </Field>
                  <ErrorMessage
                    name="assessment_type"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-bold">Select Particular</label>
                  <Field
                    as="select"
                    name="particular_id"
                    className="mt-2 block w-full border rounded-md p-2"
                  >
                    <option value="">Select</option>
                    {particularOptions[assessmentType].map(
                      (particular, index) => (
                        <option key={index} value={particular}>
                          {particular}
                        </option>
                      )
                    )}
                  </Field>
                  <ErrorMessage
                    name="particular_id"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="max-h-[500px] min-h-[450px] overflow-y-scroll">
              <FieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.map((question, index) => (
                    <div key={index} className="mb-4 border p-3 rounded-md">
                      <div className="mb-2">
                        <label className="block font-bold">Question Type</label>
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
                              setFieldValue(`questions[${index}].options`, []);
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
                        <ErrorMessage
                          name={`questions[${index}].question_text`}
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>

                      {/* Options (Only if 'choose' type) */}
                      {values.questions[index].question_type === "choose" && (
                        <div>
                          <label className="block font-bold mb-2">
                            Options
                          </label>
                          <FieldArray name={`questions[${index}].options`}>
                            {({ push: pushOption, remove: removeOption }) => (
                              <div>
                                {values.questions[index].options.map(
                                  (option, optIndex) => (
                                    <div
                                      key={optIndex}
                                      className="flex items-center mb-2"
                                    >
                                      <Field
                                        name={`questions[${index}].options[${optIndex}]`}
                                        placeholder={`Option ${optIndex + 1}`}
                                        className="mr-2 p-2 border rounded-md flex-grow"
                                      />
                                      <button
                                        type="button"
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                        onClick={() => removeOption(optIndex)}
                                      >
                                        X
                                      </button>
                                    </div>
                                  )
                                )}

                                <button
                                  type="button"
                                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                                  onClick={() => pushOption("")}
                                >
                                  Add Option
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      )}

                      <button
                        type="button"
                        className="mt-2 p-2 bg-red-500 text-white rounded"
                        onClick={() => remove(index)}
                      >
                        Remove Question
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="mt-2 p-2 bg-green-500 text-white rounded"
                    onClick={() =>
                      push({
                        question_type: "input",
                        question_text: "",
                        options: [],
                      })
                    }
                  >
                    Add Question
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
