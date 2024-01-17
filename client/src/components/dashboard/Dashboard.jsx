import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { getToken, removeToken } from "../../services/localStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuthApi.js";
import ChangePassword from "../auth/changePassword/ChangePassword.jsx";
import { useDispatch } from "react-redux";
import { setUserInfo, unsetUserInfo } from "../../features/userSlice.js";
import { unsetUserToken } from "../../features/authSlice.js";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();
  const formRef = useRef({});
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const dispatch = useDispatch();

  const token = getToken();
  const { data, isSuccess, isError } = useGetLoggedUserQuery(token);
  // console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unsetUserToken({ token: "" }));
    removeToken("token");
    setError({
      status: true,
      msg: "logout successfully!",
      type: "Success",
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.user.email,
          name: data.user.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        name: data.user.name,
        email: data.user.email,
      });
    }
  }, [data, isSuccess]);

  return (
    <>
      <div className="dashboard-container">
        <h1>
          Welcome to my Dashboard ,
          {userData.name &&
            userData.name[0].toUpperCase() + userData.name.substring(1)}
        </h1>
        <hr />
        <div className="dashboard">
          <div className="userDashboard">
            <h2>
              Email: <span>{userData.email}</span>
            </h2>
            <h2>
              Name:{" "}
              <span>
                {" "}
                {userData.name &&
                  userData.name[0].toUpperCase() + userData.name.substring(1)}
              </span>
            </h2>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* <ChangePassword /> */}
          <Link to="/changepassword" className="link">
            <h2>change password</h2>
          </Link>
          {
            <div
              className={
                error.status
                  ? error.type === "" || error.type === "Error"
                    ? "info activeError"
                    : "info activeSuccess"
                  : "info "
              }
            >
              ❎ {error.msg}
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Dashboard;
