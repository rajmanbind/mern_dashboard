import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/auth/login/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Product from "./components/product/Product";
import Contact from "./components/contact/Contact";
import Register from "./components/auth/register/Register";
import ResetPassword from "./components/auth/resetPassword/ResetPassword";
import SentEmailResetPassword from "./components/auth/sentEmailResetpassword/SentEmailResetPassword";
import Dashboard from "./components/dashboard/Dashboard";
import ChangePassword from "./components/auth/changePassword/ChangePassword";
import { useSelector } from "react-redux";
function App() {
  const { token } = useSelector((state) => state.auth);
  const Layout = () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/product/:id", element: <Product /> },
        {
          path: "/login",
          element: <> {!token ? <Login /> : <Navigate to="/dashboard" />}</>,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/sentemailresetpassword",
          element: <SentEmailResetPassword />,
        },
        {
          path: "/changepassword",
          element: <ChangePassword />,
        },
        {
          path: "/api/user/reset/:id/:token",
          element: <ResetPassword />,
        },
        {
          path: "/dashboard",
          element: <> {token ? <Dashboard /> : <Navigate to="/login" />}</>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
