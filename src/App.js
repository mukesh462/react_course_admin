import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Batch from "./pages/Batch";
import Breadcrumb from "./components/BreadCrumb";
import Student from "./pages/Student";
import BatchForm from "./Forms/BatchForm";
import StudentForm from "./Forms/StudentForm";
import Category from "./pages/Category";
import CategoryForm from "./Forms/CategoryForm";
import SubCategory from "./pages/SubCategory";
import SubCategoryForm from "./Forms/SubCategoryForm";
import Course from "./pages/Course";
import CourseForm from "./Forms/CourseForm";
import MyProfile from "./pages/MyProfile";
import MyClass from "./pages/MyClass";
import ClassForm from "./Forms/ClassForm";
import Instructor from "./pages/Instructor";
import InstructorForm from "./Forms/InstructorForm";
import Login from "./Forms/Login";
import AssessMent from "./pages/Assessment";
import AssessmentForm from "./Forms/AssessmentForm";
import MyRecording from "./pages/MyRecording";
import MaterialLink from "./pages/MaterialLink";
import MaterialForm from "./Forms/MaterialForm";

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          {/* Login route outside of AdminLayout */}
          <Route path="/login" element={<Login />} />

          {/* AdminLayout routes */}
          <Route
            path="*"
            element={
              <AdminLayout>
                <Breadcrumb />
                <div className="content-container">
                  <Routes>
                    <Route path="/MyProfile" element={<MyProfile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/class" element={<MyClass />} />
                    <Route path="/class/create" element={<ClassForm />} />
                    <Route path="/batch" element={<Batch />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/student/create" element={<StudentForm />} />
                    <Route path="/student/:id" element={<StudentForm />} />

                    <Route path="/category" element={<Category />} />
                    <Route path="/category/create" element={<CategoryForm />} />
                    <Route path="/category/:id/" element={<CategoryForm />} />

                    <Route path="/batch/create" element={<BatchForm />} />
                    <Route path="/Subcategory" element={<SubCategory />} />
                    <Route path="/Subcategory/create" element={<SubCategoryForm />} />
                    <Route path="/Subcategory/:id" element={<SubCategoryForm />} />

                    <Route path="/course" element={<Course />} />
                    <Route path="/course/create" element={<CourseForm />} />
                    <Route path="/course/:id" element={<CourseForm />} />

                    <Route path="/instructor" element={<Instructor />} />
                    <Route path="/instructor/create" element={<InstructorForm />} />
                    <Route path="/instructor/:id/" element={<InstructorForm />} />

                    <Route path="/assessment" element={<AssessMent />} />
                    <Route path="/assessment/create" element={<AssessmentForm />} />
                    <Route path="/recording" element={<MyRecording />} />
                    <Route path="/batch/:id" element={<BatchForm/>} />
                    <Route path="/materialLink" element={<MaterialLink />} />
                    <Route path="/materialLink/create" element={<MaterialForm />} />
                    <Route path="/materialLink/:id" element={<MaterialForm />} />
                  </Routes>
                </div>
              </AdminLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
