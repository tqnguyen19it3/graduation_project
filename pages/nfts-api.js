import React, { useState } from "react";
import { Header, Footer, Notification, Logo } from "../Components";
import { useStateContext } from "../Context/NFTs";
import { Helmet } from 'react-helmet';

const nftsAPI = () => {
  //STATE VARIABLE
  const { loading } = useStateContext();
  const [notification, setNotification] = useState("");

  const apiEndpoint = [
    {
      title: "Get All NFTs",
      description:
        "Welcome to NFTs API, access to all the nfts uploaded to IPFS, by following the mention steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/NFTs",
    },
    {
      title: "Get Single NFTs",
      description:
        "Single NFTS API endpoint, get access to single nft uploaded to IPFS, by following the mention steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/NFTs/:id",
    },
    {
      title: "Create Image Upload",
      description:
        "This endpoint will allow you to make post request on the server to upload the Image",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/NFTs",
    },
    {
      title: "Sign Up EndPoint",
      description:
        "Allow api user to use the NFTS API for creating account, to signup user",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/signup",
    },
    {
      title: "Login EndPoint",
      description:
        "Allow api users to use NFT API authentication for user login",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/login",
    },
    {
      title: "Forgot Password EndPoint",
      description:
        "Allow api users to use it to retrieve forgotten passwords",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/forgot-password",
    },
    {
      title: "Get User Profile Information EndPoint",
      description:
        "This endpoint will allow you to make a request on the server to get the current authenticated user's information",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/user/user-profile",
    },
    {
      title: "Get All NFTs Created By User",
      description:
        "This endpoint will allow you to make a request on the server to receive all NFTs owned by that user",
      method: "GET",
      endpoint: "http://lochttp://localhost:3000/api/v1/NFTs/nft-created-by-user/:userId",
    },
    {
      title: "Change User Profile EndPoint",
      description:
        "This endpoint will allow you to make requests on the server to change the current authenticated user information",
      method: "PUT",
      endpoint: "http://localhost:3000/api/v1/user/change-profile-info",
    },
    {
      title: "Change User Password EndPoint",
      description:
        "This endpoint will allow you to make a request on the server to change the password of the current authenticated user",
      method: "PUT",
      endpoint: "http://localhost:3000/api/v1/user/change-password",
    },
  ];

  return (
    <div className="home">
      <Helmet>
        <title>NFTs API Page</title>
      </Helmet>
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>How To Use NFTs API</h1>
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

export default nftsAPI;
