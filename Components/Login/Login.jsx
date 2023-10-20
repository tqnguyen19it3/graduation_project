import React, { useState } from "react";
import axios from "axios";
import { FormSVG, Lock } from "../SVG/index";
import Style from "./Login.module.css";
import { Notification } from "../index";

const Login = ({ setLogin, setSignUp, notification, setNotification }) => {
  //API LOGIN
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const apiLogin = async (e) => {
    e.preventDefault();

    setNotification("Waiting for login...");
    try {
      const response = await axios({
        method: "POST",
        url: `/api/v1/user/login`,
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        },
      });
      console.log(response.data);
      console.log(typeof response.data.status)
      if(response.data.status == "success"){
        setNotification("You have Successfully login");
        localStorage.setItem("NFTApi_Token", response.data.token);
        setLogin(false);
        window.location.reload();
      } else {
        setNotification('Something went wrong, try again later');
      }
    } catch (error) {
      if (error.response) {
        setNotification(error.response.data.message);
      } else {
        setNotification("An error occurred. Please try again.");
      }
      console.error(error);
    }
  };
  return (
    <>
      <div class={Style.card}>
        <div class={Style.card2}>
          <form class={Style.form}>
            <p id="heading" className={Style.heading}>
              Login
            </p>
            <div class={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                class={Style.input_field}
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </div>
            <div class={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="password"
                class={Style.input_field}
                placeholder="Password"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </div>
            <div class={Style.btn}>
              <button class={Style.button1} onClick={() => setLogin(false)}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button
                class={Style.button2}
                onClick={() => (setSignUp(true), setLogin(false))}
              >
                Sign Up
              </button>
            </div>
            <button class={Style.button3} onClick={(e) => apiLogin(e)}>
              Login
            </button>
          </form>
        </div>
      </div>

      {/* //NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default Login;
