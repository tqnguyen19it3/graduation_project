import React, { useState } from "react";
import axios from "axios";
import { Lock } from "../SVG/index";
import Style from "./ChangePassword.module.css";
import { Notification } from "../index";
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const ChangePassword = ({
  setChangePassword,
  notification,
  setNotification,
}) => {

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const NFTApi_Token = localStorage.getItem("NFTApi_Token");

  //API ChangePassword
  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUserPassword({ ...userPassword, [fieldName]: e.target.value });
  };

  const apiChangePassword = async (e) => {
    e.preventDefault();

    setNotification("Waiting for change password...");
    try {
      if (NFTApi_Token) {
        const response = await axios({
          method: "PUT",
          url: `/api/v1/user/change-password`,
          withCredentials: true,
          data: {
            currentPassword: userPassword.currentPassword,
            newPassword: userPassword.newPassword,
            passwordConfirm: userPassword.passwordConfirm,
          },
          headers: {
            Authorization: `Bearer ${NFTApi_Token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.status == "success") {
          setNotification("You have successfully change password");
          setChangePassword(false);
          window.location.reload();
        } else {
          setNotification("Something went wrong, try again later");
        }
      } else {
        setNotification("You will need to log in to use this resource");
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
              Change Password
            </p>
            <div class={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                class={Style.input_field}
                placeholder="Current password"
                onChange={(e) => handleFormFieldChange("currentPassword", e)}
              />
              <button class={Style.show_password_button} onClick={(e) => {
                e.preventDefault();
                setShowCurrentPassword(!showCurrentPassword);
              }}>
                {showCurrentPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            <div class={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type={showNewPassword ? 'text' : 'password'}
                class={Style.input_field}
                placeholder="New password"
                onChange={(e) => handleFormFieldChange("newPassword", e)}
              />
              <button class={Style.show_password_button} onClick={(e) => {
                e.preventDefault();
                setShowNewPassword(!showNewPassword);
              }}>
                {showNewPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            <div class={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                class={Style.input_field}
                placeholder="Password confirm"
                onChange={(e) => handleFormFieldChange("passwordConfirm", e)}
              />
              <button class={Style.show_password_button} onClick={(e) => {
                e.preventDefault();
                setShowConfirmPassword(!showConfirmPassword);
              }}>
                {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            <div class={Style.btn}>
              <button
                class={Style.button1}
                onClick={() => setChangePassword(false)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
            <button class={Style.button3} onClick={(e) => apiChangePassword(e)}>
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

export default ChangePassword;
