import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../services/userAuthApi";
import { getToken, storeToken } from "../../../services/localStorageService";
import { setUserToken } from "../../../features/authSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const formRef = useRef({});
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current[0].value && !formRef.current[1].value) {
      setError({ status: true, msg: "All Fields are Required", type: "Error" });
    }
    const res = await loginUser({
      email: formRef.current[0].value,
      password: formRef.current[1].value,
    });
    if (res.data.status === "Success") {
      // Storing the token

      storeToken(res.data.token);
      setError({ status: true, msg: res.data.message, type: "Success" });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    }
    if (res.data.status === "failed") {
      setError({
        status: true,
        msg: res.data.message,
        type: "Error",
      });
    }
    setTimeout(() => {
      setError((prev) => ({
        ...prev,
        status: false,
      }));
    }, 2500);
  };

  const token = getToken();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setUserToken({
        token: token,
      })
    );
  }, [token, dispatch]);
  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form" ref={formRef}>
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
        <div className="inputBox">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password..."
            autoComplete="off"
          />
        </div>
        <button type="submit">Submit</button>
        <div>
          Don't have account?
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/sentemailresetpassword"> forgot password?</Link>
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

export default Login;
