import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormSVG } from "../SVG/index";
import Style from "./ChangeProfile.module.css";
import { Notification } from "../index";

const ChangeProfile = ({
  setChangeProfile,
  notification,
  setNotification,
}) => {
  const NFTApi_Token = localStorage.getItem("NFTApi_Token");

  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("NFTApi_UserData"));
    const formattedDate = user.dob ? new Date(user.dob).toISOString().split('T')[0] : "";
    user.dob = formattedDate;
    setUserInfo(user)
  }, []);

  const handleFormFieldChange = (fieldName, e) => {
    setUserInfo({ ...userInfo, [fieldName]: e.target.value });
  };

  const userDataToSend = {
    name: userInfo.name,
    dob: userInfo.dob || undefined,
    gender: userInfo.gender || undefined,
    phoneNumber: userInfo.phoneNumber || undefined,
    address: userInfo.address || undefined,
  };

  
  const apiChangeProfile = async (e) => {
    e.preventDefault();
    setNotification("Waiting for change profile information...");
    try {
      if (NFTApi_Token) {
        const response = await axios({
          method: "PUT",
          url: `/api/v1/user/change-profile-info`,
          withCredentials: true,
          data: userDataToSend,
          headers: {
            Authorization: `Bearer ${NFTApi_Token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.status == "success") {
          setNotification("You have successfully change profile information");
          localStorage.setItem("NFTApi_UserData", JSON.stringify(response.data.data.userData));
          setChangeProfile(false);
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
              Change Profile Information
            </p>
            <div class={Style.field}>
            <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                class={Style.input_field}
                placeholder="Name"
                value={userInfo.name}
                onChange={(e) => handleFormFieldChange("name", e)}
              />
            </div>
            <div className={Style.category}>
              <label>
                  <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={(e) => handleFormFieldChange("gender", e)}
                  />
                  Male
              </label>
              <label>
                  <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={(e) => handleFormFieldChange("gender", e)}
                  />
                  Female
              </label>
              <label>
                  <input
                      type="radio"
                      name="gender"
                      value="other"
                      onChange={(e) => handleFormFieldChange("gender", e)}
                  />
                  Other
              </label>
            </div>
            <div className={Style.field}>
              <input
                  type="date"
                  className={Style.input_field}
                  value={userInfo.dob}
                  onChange={(e) => handleFormFieldChange("dob", e)}
              />
            </div>
            <div className={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                  type="text"
                  className={Style.input_field}
                  placeholder="Address"
                  value={userInfo.address}
                  onChange={(e) => handleFormFieldChange("address", e)}
              />
            </div>
            <div className={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                  type="text"
                  className={Style.input_field}
                  placeholder="Phone Number"
                  value={userInfo.phoneNumber}
                  onChange={(e) => handleFormFieldChange("phoneNumber", e)}
              />
            </div>
            <div class={Style.btn}>
              <button
                class={Style.button1}
                onClick={() => setChangeProfile(false)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
            <button class={Style.button3} onClick={(e) => apiChangeProfile(e)}>
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

export default ChangeProfile;
