import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../services/userAuthApi";
import { storeToken } from "../../../services/localStorageService";
const Register = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const formRef = useRef({});
  const navigate = useNavigate();

  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formRef.current[0].value &&
      formRef.current[1].value &&
      formRef.current[2].value &&
      formRef.current[3].value &&
      formRef.current[4].checked
    ) {
      if (formRef.current[2].value === formRef.current[3].value) {
        const userData = await registerUser({
          name: formRef.current[0].value,
          email: formRef.current[1].value,
          password: formRef.current[2].value,
          password_confirmation: formRef.current[3].value,
          turmCondition: formRef.current[4].checked,
        });
        setError({
          status: true,
          msg: userData.data.message,
          type: userData.data.status,
        });
        if (userData.data.status === "Success") {
          // Storing the token
          storeToken(userData.data.token);
          setTimeout(() => {
            navigate("/login");
          }, 2500);
        }
        if (userData.data.status === "failed") {
          setError({
            status: true,
            msg: userData.data.message,
            type: "Error",
          });
        }
      } else {
        setError({
          status: true,
          msg: "password not matching",
          type: "Error",
        });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "Error" });
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
        <div className="inputBox">
          <label htmlFor="name">username:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            autoComplete="off"
          />
        </div>
        <div className="inputBox">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email..."
            autoComplete="off"
          />
        </div>
        <div className="inputBox ">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password..."
            autoComplete="off"
          />
        </div>
        <div className="inputBox ">
          <label htmlFor="cnf_password">Cnf_password:</label>
          <input
            type="password"
            id="cnf_password"
            name="cnf_password"
            placeholder="confirm password..."
            autoComplete="off"
          />
        </div>
        <div className="inputBox checkbox">
          <input type="checkbox" id="checkbox" name="checkbox" />
          <label htmlFor="password">agreed all condtions</label>
        </div>
        <button type="submit">Submit</button>
        <div>
          Already have account?
          <Link to="/login">Login</Link>
        </div>
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

export default Register;
