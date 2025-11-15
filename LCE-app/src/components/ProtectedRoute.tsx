// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthContext } from "../auth/AuthProvider";

// interface ProtectedRouteProps {
//   allowedRoles: Array<"admin" | "startup">;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
//   const { isAuthenticated, isAdmin, isStartup } = useAuthContext();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles.includes("admin") && !isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   if (allowedRoles.includes("startup") && !isStartup) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
