import React, { useState } from "react";
import { Header, Footer, Notification, Logo } from "../Components";
import { useStateContext } from "../Context/NFTs";

const nftsAPI = () => {
  //STATE VARIABLE
  const { loading } = useStateContext();
  const [notification, setNotification] = useState("");

  const apiEndpoint = [
    {
      title: "Get All NFTs",
      description:
        "Welcome to NFTs Api, access to all the nfts uploaded to IPFS, by following the mention steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/NFTs",
    },
    {
      title: "Get Single NFTs",
      description:
        "Single NFTS Api endpoint, get access to single nft uploaded to IPFS, by following the mention steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/NFTs/Id",
    },
    {
      title: "Create Image Upload",
      description:
        "This endpoint will allow you to make post request on the server to upload the Image",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/NFTs",
    },
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
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>How To Use NFTS API</h1>
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
    </div>
  );
};

export default nftsAPI;
