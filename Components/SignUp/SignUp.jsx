import React, { useState } from "react";
import axios from "axios";
import { FormSVG, Lock } from "../SVG/index";
import Style from "./SignUp.module.css";
import { Notification } from "../index";

const SignUp = ({ setLogin, setSignUp, notification, setNotification }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",     
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const createAccount = async (e) => {
    e.preventDefault();
    if (
      user.email == "" ||
      user.name == "" ||
      user.password == "" ||
      user.passwordConfirm == ""
    ){
      return setNotification("Please provide all the detail");
    }
    setNotification("Wait creating account...");
    console.log(user);
    try {
      //API CALL
      const response = await axios({
        method: "POST",
        url: `/api/v1/user/singup`,
        withCredentials: true,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
        }
      });
      if(response.data.status == "success") {
        setNotification("Account is successfully created");
        localStorage.setItem("NFTApi_Token", response.data.token);
        setSignUp(false);
        setNotification("");
        window.location.reload();
      } else {
        setNotification("Something went wrong, try again later");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class={Style.card}>
        <div class={Style.card2}>
          <form class={Style.form}>
            <p id="heading" className={Style.heading}>
              SignUp
            </p>
            <div class={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                class={Style.input_field}
                placeholder="name"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("name", e)}
              />
            </div>
            <div class={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                class={Style.input_field}
                placeholder="email"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </div>
            <div class={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="text"
                class={Style.input_field}
                placeholder="password"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </div>
            <div class={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="text"
                class= {Style.input_field}
                placeholder="passwordConfirm"
                onChange={(e) => handleFormFieldChange("passwordConfirm", e)}
              />
            </div>
            <div class={Style.btn}>
              <button class={Style.button1} onClick={() => setSignUp(false)}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button
                class={Style.button2}
                onClick={() => (setLogin(true), setSignUp(false))}
              >
                Login
              </button>
            </div>
            <button class={Style.button3} onClick={(e) => createAccount(e)}>
              SignUp
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

export default SignUp;
