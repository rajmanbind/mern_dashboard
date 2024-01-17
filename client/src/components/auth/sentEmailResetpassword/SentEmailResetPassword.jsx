import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendPasswordResetEmailMutation } from "../../../services/userAuthApi.js";
// import { storeToken } from "../../../services/localStorageService.js";
const SentEmailResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const formRef = useRef({});

  const [sendPasswordResetEmail, { isLoading }] =
    useSendPasswordResetEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current[0].value) {
      setError({ status: true, msg: "Input fields required! ", type: "Error" });
    } else {
      const res = await sendPasswordResetEmail({
        email: formRef.current[0].value,
      });
      // console.log(res);
      if (res.data.status === "Success") {
        // Storing the token
        // storeToken(res.data.token);
        console.log(res.data.link);
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email..."
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

export default SentEmailResetPassword;
