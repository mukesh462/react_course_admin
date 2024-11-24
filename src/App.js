import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
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
import banner from './assets/banner.jpg'
// PrivateRoute Component
function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}


// Redirect Logged-in Users from Login
function PublicRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" /> : children;
}

function App() {
  const userData = useSelector((state) => state.login.user);

  return (
    <Router>
      <div className="w-full h-vh" 
     style={{
      backgroundImage: `url(${banner})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.5)"// Set the fallback background color
    }}
        
        >
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="*"
            element={
              <PrivateRoute>
                <AdminLayout>
                  {userData?.isAdmin == 1 && <Breadcrumb />}

                  <div className="content-container">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />

                      <Route path="/MyProfile" element={<MyProfile />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/class" element={<MyClass />} />
                      <Route path="/class/create" element={<ClassForm />} />
                      <Route path="/class/:id" element={<ClassForm />} />

                      <Route path="/batch" element={<Batch />} />
                      <Route path="/student" element={<Student />} />
                      <Route path="/student/create" element={<StudentForm />} />
                      <Route path="/student/:id" element={<StudentForm />} />

                      <Route path="/category" element={<Category />} />
                      <Route
                        path="/category/create"
                        element={<CategoryForm />}
                      />
                      <Route path="/category/:id/" element={<CategoryForm />} />

                      <Route path="/batch/create" element={<BatchForm />} />
                      <Route path="/Subcategory" element={<SubCategory />} />
                      <Route
                        path="/Subcategory/create"
                        element={<SubCategoryForm />}
                      />
                      <Route
                        path="/Subcategory/:id"
                        element={<SubCategoryForm />}
                      />

                      <Route path="/course" element={<Course />} />
                      <Route path="/course/create" element={<CourseForm />} />
                      <Route path="/course/:id" element={<CourseForm />} />

                      <Route path="/instructor" element={<Instructor />} />
                      <Route
                        path="/instructor/create"
                        element={<InstructorForm />}
                      />
                      <Route
                        path="/instructor/:id/"
                        element={<InstructorForm />}
                      />

                      <Route path="/assessment" element={<AssessMent />} />
                      <Route
                        path="/assessment/create"
                        element={<AssessmentForm />}
                      />
                      <Route path="/recording" element={<MyRecording />} />
                      <Route path="/batch/:id" element={<BatchForm />} />
                      <Route path="/materialLink" element={<MaterialLink />} />
                      <Route
                        path="/materialLink/create"
                        element={<MaterialForm />}
                      />
                      <Route
                        path="/materialLink/:id"
                        element={<MaterialForm />}
                      />
                    </Routes>
                  </div>
                </AdminLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
