import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  Home,
  EventsPage,
  Programs,
  Portfolio,
  Register,
  Login,
} from "./Pages/index.tsx";
import Layout from "./components/layout.tsx";
import Aboutus from "./Pages/Aboutus.tsx";
import { AuthProvider, useAuth } from "./auth/AuthProvider.tsx";
import AdminDashboard from "./Pages/AdminDashboard.tsx";
import StartupDashboard from "./Pages/StartupDashboard.tsx";
import BlogList from "./Pages/Blog.tsx";
import BlogPost from "./components/blogPost.tsx";
import { allPosts } from "content-collections";
import { useParams } from "react-router-dom";
import AlumniPage from "./Pages/Alumni.tsx";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, isAdmin, isStartup } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes("admin") && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.includes("startup") && !isStartup) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/events" element={<EventsPage />} />
            <Route
              path="/admindashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/startupdashboard"
              element={
                <ProtectedRoute allowedRoles={["startup"]}>
                  <StartupDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/programs" element={<Programs />} />
            <Route path="/alumni" element={<AlumniPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/community" element={<BlogList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog/:slug" element={<BlogPostWrapper />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function BlogPostWrapper() {
  const { slug } = useParams<{ slug: string }>();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <BlogPost post={post} />;
}

export default App;
