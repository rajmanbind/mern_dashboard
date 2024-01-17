import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useChangeUserPasswordMutation } from "../../../services/userAuthApi.js";
import { getToken } from "../../../services/localStorageService.js";
const ChangePassword = () => {
  const navigate = useNavigate();
  const formRef = useRef({});
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const token = getToken();
  const [changeUserPassword] = useChangeUserPasswordMutation();
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
        // console.log(token);
        // console.log(data);
        const res = await changeUserPassword({ data, token });
        // console.log(res);
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
        <h3>Change Password:</h3>
        <div className="inputBox ">
          <label htmlFor="password"> Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password..."
            autoComplete="off"
          />
        </div>
        <div className="inputBox ">
          <label htmlFor="cnf_password"> Cnf_password:</label>
          <input
            type="password"
            id="cnf_password"
            name="cnf_password"
            placeholder="confirm password..."
            autoComplete="off"
          />
        </div>

        <button type="submit">Submit</button>
        <Link to="/dashboard">◀️ Back</Link>
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

export default ChangePassword;
