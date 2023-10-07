import React from "react";
import Style from "./Notification.module.css";

const Notification = ({ setNotification, notification }) => {
  return (
    <div onClick={() => setNotification("")} class={Style.alert}>
      {notification} &nbsp;
      <span>&times;</span>
    </div>
  );
};

export default Notification;
