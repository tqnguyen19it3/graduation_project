import React, { useState, useEffect } from "react";
import { Header, Footer, Notification, Logo, Card } from "../Components";
import { useStateContext } from "../Context/NFTs";
import { Helmet } from 'react-helmet';
import images from "../Components/Image/client/index";
import Image from "next/image";
import axios from "axios";

const Profile = () => {

  //STATE VARIABLE
  const { loading, address, contract, getUploadedImages } = useStateContext();
  const [notification, setNotification] = useState("");
  const [createdByUserImages, setCreatedByUserImages] = useState([]);
  const [userData, setUserData] = useState("");

  //GET API DATA CREATED BY USER
  // const getAllNftsCreatedByUserAPI = async (id) => {
  //   const response = await axios({
  //       method: "GET",
  //       url: `/api/v1/NFTs/nft-created-by-user/${id}`,
  //   });
  //   return response.data.data.NFTCreatedByUser;
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const imageByUser = await getAllNftsCreatedByUserAPI("6532b27dd90a2c0f78c454d2");
        const user = JSON.parse(localStorage.getItem("NFTApi_UserData"));
        setUserData(user);
        const allImage = await getUploadedImages();
        const imageCreatedByUser = allImage.filter((item) =>{
          return item.email === user.email;
        });
        setCreatedByUserImages(imageCreatedByUser);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong!");
      }
    };
    if (contract) fetchData();
  }, [address, contract]);

  return (
    <div className="home">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>User Information</h1>
      </div>
      <div className="cardProfile">
        <Image
          className="avatar_img"
          src={images.client1}
          alt="avatar"
        />
        <h4>Username: {userData.name}</h4>
        <h4>Email: {userData.email}</h4>
        <h4>Role: {userData.role}</h4>
        <p>About: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum et explicabo consectetur, saepe optio obcaecati repellat labore inventore pariatur corporis nam, officia nobis sit id molestiae ducimus fugit, distinctio non!</p>
        <div style={{display: "inline-flex"}}>
          <button>Change Profile</button>
          <button>Change Password</button>
        </div>
      </div>
      <div className="header">
        <h1>Owned NFTs</h1>
      </div>
      <div className="card">
        {createdByUserImages.map((image, i) => (
          <Card
            key={i + 1}
            index={i}
            image={image}
            setNotification={setNotification}
          />
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

export default Profile;
