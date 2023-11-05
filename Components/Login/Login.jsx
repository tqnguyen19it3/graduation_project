import React, { useState } from "react";
import axios from "axios";
import { FormSVG, Lock } from "../SVG/index";
import Style from "./Login.module.css";
import { Notification } from "../index";
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const Login = ({ setLogin, setSignUp, setForgotPassword, notification, setNotification }) => {

  const [showPassword, setShowPassword] = useState(false);

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
      if(response.data.status == "success"){
        setNotification("You have successfully login");
        localStorage.setItem("NFTApi_Token", response.data.token);
        localStorage.setItem("NFTApi_UserData", JSON.stringify(response.data.data.user));
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
                type={showPassword ? 'text' : 'password'}
                class={Style.input_field}
                placeholder="Password"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
              <button class={Style.show_password_button} onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}>
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            <div class={Style.btn}>
              <button class={Style.button1} onClick={() => setLogin(false)}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
            <div class={Style.btn2}>
               <button
                class={Style.button12}
                onClick={() => (setForgotPassword(true), setLogin(false))}
              >
                Forgot password
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
