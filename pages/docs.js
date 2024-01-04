import React, { useState } from "react";
import Image from "next/image";
import { Helmet } from 'react-helmet';
import { Header, Footer, Notification, Logo } from "../Components";
import { useStateContext } from "../Context/NFTs";
import images from "../Components/Image/technology/index";

const Docs = () => {
  //STATE VARIABLE
  const { loading } = useStateContext();
  const [notification, setNotification] = useState("");

  return (
    <div className="home">
      <Helmet>
        <title>Docs Page</title>
      </Helmet>
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>Document</h1>
      </div>
      <div className="documentation-page">
        <nav>
          <ul>
            <li>
              <a href="#introduction">Introduction</a>
            </li>
            <li>
              <a href="#getting-started">Getting Started</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#result">Result</a>
            </li>
            <li>
              <a href="#technologies_used">Technologies</a>
            </li>
          </ul>
        </nav>

        <main>
          <section id="introduction">
            <h2 className="doc-title">Introduction</h2>
            <p className="introduce-text">
              &#09;In the realm of Information Technology (IT), the advent of blockchain technology has ushered in a new era of decentralized and trustless applications. The focus of this thesis revolves around the development and deployment of a blockchain-based Decentralized Application (DApp) that incorporates Non-Fungible Tokens (NFTs), leverages the InterPlanetary File System (IPFS), and integrates Web3 technologies. The project encompasses a myriad of cutting-edge tools and frameworks, to create a comprehensive Web3.0 product.
            </p>
            <p className="introduce-text">
              &#09;The primary challenge addressed by this research is the existing gap in decentralized applications catering to the seamless creation, management, and interaction with NFTs. In the current landscape, while blockchain technology has gained momentum, the integration of user-friendly interfaces and functionalities for NFT-related operations remains underexplored.
            </p>
            <p className="introduce-text">
              &#09;Additionally, the lack of standardized and user-friendly APIs for Web3 interactions poses a hindrance to the widespread adoption of blockchain-based applications. This research aims to contribute by building a Web3 API that enables users to seamlessly upload NFTs to IPFS and perform API requests to fetch all smart contract data from the IPFS blockchain.
            </p>
            <p className="introduce-text">
              &#09;In essence, the problem statement encapsulates the imperative to bridge the gap between the potential of blockchain technology and its user-friendly, practical implementation. This project seeks to address these challenges by delivering a feature-rich and aesthetically pleasing Web3.0 product with a focus on NFT creation, management, and interaction, along with decentralized and resilient data storage solutions.
            </p>
          </section>

          <section id="getting-started">
            <h2 className="doc-title">Getting Started</h2>
            <p>
              To get started with the project, follow these simple steps:
            </p>
            <ol>
              <li>Open your Terminal or CMD</li>
              <li>Run command: <code>git clone https://github.com/tqnguyen19it3/graduation_project.git</code></li>
              <li>Move to the project's main directory: <code>cd graduation_project</code></li>
              <li>Put the necessary packages into your project: <code>npm install</code> or <code>yarn install</code></li>
              <li>Configure the project settings:
                <ul>
                  <li>config.env file</li>
                  <li>hardhat.config.js file</li>
                </ul>
              </li>
              <li>Move to web3 directory and run the command: <code>npm run deploy</code> or <code>yarn deploy</code></li>
              <li>Run the project locally outside of the project's main directory: <code>npm start</code> or <code>yarn start</code></li>
            </ol>
          </section>

          <section id="features">
            <h2 className="doc-title">Features</h2>
            <ul>
              <li>
                <h3>Register Feature</h3>
                <p>
                  The "Register" allows users to create new accounts in the system. Users provide the necessary personal information to create an account, and they can then use that account to access other features and services within the app.
                </p>
              </li>
              <li>
                <h3>Login Feature</h3>
                <p>
                  The "Login" allows users to use their registered login name and password to access the system. After successfully logging in, users have access to the application's features and services.
                </p>
              </li>
              <li>
                <h3>Forgot Password Feature</h3>
                <p>
                "Forgot Password" allows users to recover their account's password when they forget their current password. Users provide information for verification, and they can then reset a new password to access their account.
                </p>
              </li>
              <li>
                <h3>Update User Profile Feature</h3>
                <p>
                 "Update User Profile" allows the user to change personal information in the user profile. Users can update information such as name, address, phone number,...
                </p>
              </li>
              <li>
                <h3>Upload NFT Feature</h3>
                <p>
                  "Upload NFT" allows users to create and upload a decentralized digital asset (NFT) to a blockchain platform.
                </p>
              </li>
              <li>
                <h3>Donate Feature</h3>
                <p>
                  "Donate" allows users to donate in the form of Matic cryptocurrency to the NFT owner as a form of voluntary support or appreciation of the artwork.
                </p>
              </li>
            </ul>
          </section>

          <section id="result">
            <h2 className="doc-title">Result</h2>
            <p className="introduce-text">
            The primary objective of this thesis is to envision, create, and implement a fully functional and visually captivating Web3.0 product, with a primary emphasis on developing a decentralized application (DApp) using Blockchain technology. Specifically, this project centers around Non-Fungible Tokens (NFTs) and involves constructing a web3 API that enables users to initiate API requests for comprehensive data retrieval. The application aims to empower users by facilitating the seamless uploading of NFTs to IPFS, ensuring the storage of NFTs and associated metadata in a distributed and resilient manner. To address current challenges in NFT creation, management, and user engagement, cutting-edge tools and frameworks will be harnessed, allowing for innovative solutions to be implemented.
            </p>
          </section>

          <section id="technologies_used">
            <h2 className="doc-title">Technologies</h2>
            <div className="image-container">
              <Image
                className="tech_img"
                src= {images.tech1}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech2}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech3}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech4}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech5}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech6}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech7}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech8}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech9}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech10}
                width={40}
                height={40}
                alt="image"
              />
              <Image
                className="tech_img"
                src= {images.tech11}
                width={40}
                height={40}
                alt="image"
              />
            </div>
          </section>
        </main>
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

export default Docs;
