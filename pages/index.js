import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import Image from "next/image";
import axios from "axios";
import {
  Card,
  Upload,
  Button,
  Profile,
  Header,
  Footer,
  Notification,
  Logo,
  Filter,
  Form,
} from "../Components";
import { useStateContext } from "../Context/NFTs";
import images from "../Components/Image/client/index";

const Home = () => {
  //STATE VARIABLE
  const {
    address,
    disconnect,
    contract,
    connect,
    userBalance,
    UploadImage,
    getUploadedImages,
    setLoading,
    loading,
    //API
    getAllNftsAPI,
  } = useStateContext();

  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [activeSelect, setActiveSelect] = useState("Old Images");
  const [imagesCopy, setImagesCopy] = useState([]);
  //GET DATA
  const oldImages = [];

  const fetchImages = async () => {
    const images = await getUploadedImages();
    setAllImages(images);
    //API NFTS
    const apiImages = await getAllNftsAPI();
  }
  useEffect (() => {
    if (contract) fetchImages();
  }, [address, contract]);

  if (allImages.length == 0) {
    console.log("Loading");
  } else {
    allImages.map((el) => oldImages.push(el));
  }
  
  //IMAGE DATA
  const [category, setCategory] = useState("");
  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    email: "",
    category: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //UPLOAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCloseForm(false);
    setLoading(true);
    if (
      !imageInfo.title || !imageInfo.description || !imageInfo.email || !category || !file
    ){
      setNotification("Please provide all the detail");
      setTimeout(function(){
        location.reload();
      }, 2000);
    } else {
      if(!(emailRegex.test(imageInfo.email))){
        setNotification("Please provide a valid email address");
        setTimeout(function(){
          location.reload();
        }, 2000);
      }
      else if(!address){
        setNotification("This action requires a connected wallet to sign the transaction");
        setTimeout(function(){
          location.reload();
        }, 3000);
      } else {
        try{
          const formData = new FormData();
          formData.append("file", file);
  
          const response = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `9d03a2850c7a2c190538`,
              pinata_secret_api_key: `19df2cf3af00256fc86448cee4cd5796e58acb0dcd62ba86090c28aaad4efba5`,
              // pinata_api_key: `3b1697b42d5859d6a42f`,
              // pinata_secret_api_key: `dcfcb3154f52ba92f8813b9a2ee29c236261df3de39625e17144f84c4fbb8a0f`,
              "Content-Type": "multipart/form-data",
            }
          });
          const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
          
          await UploadImage({
            ...imageInfo,
            image: image,
            category: category,
          });
          setFile(null);
        } catch (error) {
          setNotification("Something went wrong! Please try again");      
        }
      }
    }
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  //TAKE IMAGE
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDisplay(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>Create 1000 NFTs for free</h1>
      </div>
      {/* //UPLOAD */}
      <div className="upload">
        <Upload
          onImageChange={onImageChange}
          display={display}
          address={address}
          retrieveFile={retrieveFile}
        />
        <div className="upload-info">
          <h1>Welcome to NFTs IPFS Upload</h1>
          <p>
            Our products help you securely distribute any type of media at
            scale-freeing you from restrictive platforms, middlemen, and
            algorithms that limit your creative agency.
          </p>
          <div className="avatar">
              <Button
                address={address}
                disconnect={disconnect}
                connect={connect}
                file={file}
              />
              {address && (
                <p>
                  <Image
                    className="avatar_img"
                    src= {images.client1}
                    width={40}
                    height={40}
                    alt="image"
                    onClick={() => setOpenProfile(true)}
                  />
                </p>
              )}
            </div>
          </div>
        </div>
        <h1 className="subheading">All NFTs of Marketplace</h1>
        {/* //CARD */}
        {allImages.length == 0 ? (
          <Logo />
        ) : allImages == undefined ? (
          <h1>No Images</h1>
        ) : (
          <>
            <Filter
              setImagesCopy={setImagesCopy}
              imagesCopy={imagesCopy}
              setAllImages={setAllImages}
              allImages={allImages}
              oldImages={oldImages}
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
            />
            <div className="card">
              {allImages.map((image, i) => (
                <Card
                  key={i + 1}
                  index={i}
                  image={image}
                  setNotification={setNotification}
                />
              ))}
            </div>
          </>
        )}
        <Footer />
        {/* //NOTIFICATION */}
        {notification != "" && (
          <Notification
            notification={notification}
            setNotification={setNotification}
          />
        )}
        {/* //PROFILE */}
        {openProfile && (
          <div className="profile">
            <Profile
              setOpenProfile={setOpenProfile}
              userBalance={userBalance}
              address={address}
            />
          </div>
        )}
      {/* //LOADER */}
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
      {/* //FORM */}
      {file && closeForm && (
        <div className="form">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleFormFieldChange={handleFormFieldChange}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;