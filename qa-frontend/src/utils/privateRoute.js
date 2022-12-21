import { Navigate, Outlet } from "react-router-dom";
import jwtDecoder from "jwt-decode";
import { FacultyContext } from "../context/facultyContext";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token");
  const [faculty, setFaculty] = useState(null);
  useEffect(() => {
    if (token) {
      const {
        user: { faculty, level },
      } = jwtDecoder(token);
      if (!level) setFaculty(faculty);
    }
  }, [token]);

  return token ? (
    <FacultyContext.Provider value={faculty}>
      <Outlet />
    </FacultyContext.Provider>
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoutes;
