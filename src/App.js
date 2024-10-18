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

function App() {
  return (
    <Router>
      <div className="">
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
              <Route path="/category" element={<Category />} />
              <Route path="/category/create" element={<CategoryForm />} />
              <Route path="/batch/create" element={<BatchForm />} />
              <Route path="/Subcategory" element={<SubCategory />} />
              <Route path="/Subcategory/create" element={<SubCategoryForm />} />
              <Route path="/course" element={<Course />} />
              <Route path="/course/create" element={<CourseForm />} />
              <Route
                path="/batch/:id/create"
                element={<div>Create Batch</div>}
              />
              <Route path="/batch/:id/edit" element={<div>Edit Batch</div>} />
            </Routes>
          </div>
        </AdminLayout>
      </div>
    </Router>
  );
}

export default App;
