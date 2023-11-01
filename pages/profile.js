import React, { useState } from "react";
import { Header, Footer, Notification, Logo } from "../Components";
import { useStateContext } from "../Context/NFTs";
import { Helmet } from 'react-helmet';

const Profile = () => {
  //STATE VARIABLE
  const { loading } = useStateContext();
  const [notification, setNotification] = useState("");

  return (
    <div className="home">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>How To Use NFTs API</h1>
      </div>
      <div className="api-body">

      </div>
      {/* //NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      {/* //LOADER */}
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
