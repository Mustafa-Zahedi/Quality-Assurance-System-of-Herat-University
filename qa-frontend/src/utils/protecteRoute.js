import { Outlet } from "react-router-dom";
import jwtDecoder from "jwt-decode";

const ProtectedRoutes = () => {
  const token = sessionStorage.getItem("token");
  const { user } = jwtDecoder(token);
  // console.log("user", user);
  return user.level ? (
    <Outlet />
  ) : (
    <div className="relative grid h-96 w-full">
      <p className="text-center mt-5 font-mono">
        فقط ادمین به این بخش دسترسی دارد
      </p>
      <div className="absolute w-full top-20 left-0 opacity-10">
        <img src="/icons/security.jpg" alt="locked" />
      </div>
    </div>
  );
};
export default ProtectedRoutes;
