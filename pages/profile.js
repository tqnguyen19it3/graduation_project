import React, { useState, useEffect } from "react";
import {
  Header,
  Footer,
  Notification,
  Logo,
  Card,
  ChangeProfile,
  ChangePassword,
} from "../Components";
import { useStateContext } from "../Context/NFTs";
import { Helmet } from "react-helmet";
import images from "../Components/Image/client/index";
import Image from "next/image";
import axios from "axios";

const Profile = () => {
  //STATE VARIABLE
  const { loading, address, contract, getUploadedImages } = useStateContext();
  const [notification, setNotification] = useState("");
  const [createdByUserImages, setCreatedByUserImages] = useState([]);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");
  const [changeProfile, setChangeProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const NFTApi_Token = localStorage.getItem("NFTApi_Token");
    setToken(NFTApi_Token);
    const fetchData = async () => {
      try {
        if (NFTApi_Token) {
          const headers = {
            Authorization: `Bearer ${NFTApi_Token}`,
          };
          const response = await axios.get(`/api/v1/user/user-profile/`, {
            headers,
          });
          if (response.data.status == "success") {
            setUserData(response.data.data.user);
            const allImage = await getUploadedImages();
            const imageCreatedByUser = allImage.filter((item) => {
              return item.email === response.data.data.user.email;
            });
            setCreatedByUserImages(imageCreatedByUser);
          } else {
            setNotification("Something went wrong, try again later");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          setNotification(error.response.data.message);
        } else {
          setNotification("An error occurred. Please try again.");
        }
      }
    };
    if (contract) fetchData();
  }, [address, contract]);

  return (
    <div className="home">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <Header notification={notification} setNotification={setNotification} />
      {token ? (
        <>
          <div className="header">
            <h1>User Information</h1>
          </div>
          <div className="cardProfile">
            <Image className="avatar_img" src={images.client1} alt="avatar" />
            <h4>Username: {userData.name}</h4>
            <h4>Email: {userData.email}</h4>
            <h4>Gender: {userData?.gender}</h4>
            <h4>Dob: {userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : ""}</h4>
            <h4>PhoneNumber: {userData.phoneNumber}</h4>
            <h4>Address: {userData.address}</h4>
            <h4>Role: {userData.role}</h4>
            <div style={{ display: "inline-flex" }}>
              <button onClick={() => setChangeProfile(true)}>
                Change Profile
              </button>
              <button onClick={() => setChangePassword(true)}>
                Change Password
              </button>
            </div>
          </div>
          <div className="header">
            <h1>Owned NFTs</h1>
          </div>
          {createdByUserImages.length > 0 ? (
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
          ) : (
            <h3>Currently you do not own any NFTs</h3>
          )}
        </>
      ) : (
        <>
          <div className="containerError">
            <h2>401 Unauthorized</h2>
            <p>
              Sorry! The page you are trying to access requires authentication
            </p>
          </div>
        </>
      )}

      {/* ChangeProfile */}
      {changeProfile && (
        <div className="form">
          <div className="form_inner">
            <ChangeProfile
              setChangeProfile={setChangeProfile}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}

      {/* ChangePassword */}
      {changePassword && (
        <div className="form">
          <div className="form_inner">
            <ChangePassword
              setChangePassword={setChangePassword}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}

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
