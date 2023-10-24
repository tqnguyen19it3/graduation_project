import React, { useState } from "react";
import axios from "axios";
import { FormSVG, Lock } from "../SVG/index";
import Style from "./ForgotPassword.module.css";
import { Notification } from "../index";

const ForgotPassword = ({ setForgotPassword, setLogin, setSignUp, notification, setNotification }) => {
  // API FORGOT PASSWORD
  const [user, setUser] = useState({
    email: ""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const apiForgotPassword = async (e) => {
    e.preventDefault();

    setNotification("Waiting to retrieve password...");
    try {
      const response = await axios({
        method: "POST",
        url: `/api/v1/user/forgot-password`,
        withCredentials: true,
        data: {
          email: user.email
        },
      });
      console.log("haha: ", response);
      if(response.data.status == "success"){
        setNotification(response.data.message);
        setForgotPassword(false);
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
                Retrieve forgotten password
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
            <div class={Style.btn}>
                <button class={Style.button1} onClick={() => setForgotPassword(false)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
            </div>
            <div class={Style.btn2}>
                <button
                    class={Style.button1}
                    onClick={() => (setLogin(true), setForgotPassword(false))}
                >
                    Login
                </button>
                <button
                    class={Style.button2}
                    onClick={() => (setSignUp(true), setForgotPassword(false))}
                >
                    Sign Up
                </button>
            </div>
            <button class={Style.button3} onClick={(e) => apiForgotPassword(e)}>
              Submit
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

export default ForgotPassword;
