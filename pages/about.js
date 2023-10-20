import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { Header, Footer, Notification, Logo } from "../Components";
import { useStateContext } from "../Context/NFTs";

const about = () => {
  //STATE VARIABLE
  const { loading } = useStateContext();
  const [notification, setNotification] = useState("");

  const apiEndpoint = [
    {
      title: "Login EndPoint",
      description:
        "Allow api user to use the NFTs API authentication, to log user in",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/login",
    },
    {
      title: "SignUp EndPoint",
      description:
        "Allow api user to use the NFTS API for creating account, to signup user ",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/signup",
    },
  ];

  return (
    <div className="home">
      <Helmet>
        <title>About Page</title>
      </Helmet>
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>About</h1>
      </div>
      <div className="api-body">
        {apiEndpoint.map((api, i) => (
          <div className="api-left">
            <h3 className="api-title">{api.title}</h3>
            <p>{api.description}</p>
            <p>Method: {api.method}</p>
            <p>Endpoint: {api.endpoint}</p>
          </div>
        ))}
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

export default about;
