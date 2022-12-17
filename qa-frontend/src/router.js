import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FacultyContext } from "./context/facultyContext";
import LandingPage from "./pages";
import Department from "./pages/department";
import Dashboard from "./pages/dashboard";
import Faculty from "./pages/faculty";
import Login from "./pages/login";
import PrivateRoutes from "./utils/privateRoute";
import ProtectedRoutes from "./utils/protecteRoute";
import Form from "./pages/evaluation-form";
import Users from "./pages/users";
import Student from "./pages/student";
import Teachers from "./pages/teachers";
import Subject from "./pages/subject";
import Question from "./pages/question";
import Layout from "./components/layout/layout";
import AddUser from "./components/users/add-user";
import DepartmentReportSelection from "./components/reports/department/selectDep";
import TeacherReportSelection from "./components/reports/teacher/selectTeacher";
import TotalReportSelection from "./components/reports/general/selectYear";
import NotFound from "./pages/notFound";
import SubjectReportSelection from "./components/reports/subject/selectSubject";

function Router() {
  return (
    <FacultyContext.Provider value={null}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="student">
            <Route index element={<Student />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route element={<ProtectedRoutes />}>
                <Route path="user">
                  <Route path="add-users" element={<AddUser />} />
                  <Route path="users" element={<Users />} />
                </Route>
              </Route>
              <Route path="dashboard">
                <Route element={<ProtectedRoutes />}>
                  <Route path="faculty" element={<Faculty />} />
                </Route>
                <Route path="form" element={<Form />} />
                <Route path="department" element={<Department />} />
                <Route path="teacher" element={<Teachers />} />
                <Route path="subject" element={<Subject />} />
                <Route path="question" element={<Question />} />
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="report">
                <Route element={<ProtectedRoutes />}>
                  <Route path="total" element={<TotalReportSelection />} />
                </Route>
                <Route
                  path="department"
                  element={<DepartmentReportSelection />}
                />
                <Route path="teacher" element={<TeacherReportSelection />} />
                <Route path="subject" element={<SubjectReportSelection />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FacultyContext.Provider>
  );
}

export default Router;
