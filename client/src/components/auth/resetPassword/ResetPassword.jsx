import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../../services/userAuthApi.js";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const formRef = useRef({});
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current[0].value && !formRef.current[1].value) {
      setError({ status: true, msg: "Input fields required! ", type: "Error" });
    } else {
      if (formRef.current[0].value === formRef.current[1].value) {
        const data = {
          password: formRef.current[0].value,
          password_confirmation: formRef.current[1].value,
        };
        const res = await resetPassword({ data, id, token });
        if (res.data.status === "Success") {
          setError({
            status: true,
            msg: res.data.message,
            type: "Success",
          });
          setTimeout(() => {
            navigate("/login");
          }, 2500);
        }
        if (res.data.status === "failed") {
          setError({
            status: true,
            msg: res.data.message,
            type: "Error",
          });
        }
      } else {
        setError({
          status: true,
          msg: "Password doesn't Match!",
          type: "Error",
        });
      }
    }
    setTimeout(() => {
      setError((prev) => ({
        ...prev,
        status: false,
      }));
    }, 2500);
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form" ref={formRef}>
        <h4>Create New Password</h4>
        <div className="inputBox ">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="new password..."
            autoComplete="off"
          />
        </div>
        <div className="inputBox ">
          <label htmlFor="cnf_password">New Cnf_password:</label>
          <input
            type="password"
            id="cnf_password"
            name="cnf_password"
            placeholder="new confirm password..."
            autoComplete="off"
          />
        </div>

        <button type="submit">Send</button>
      </form>
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
  );
};

export default ResetPassword;
