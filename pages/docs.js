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
              &#09;A fully decentralized application (DApp) refers to a software application built on a blockchain platform and uses smart contracts to provide decentralized functionality. Functionality includes: Register, log in, allow users to create NFTs, search for NFTs, donate, etc. The project usually includes two main components: front-end (client side) and back-end (server side).
            </p>
            <p className="introduce-text">
              &#09;The user interface of the full blockchain stack DApp is responsible for the user interface and user interactions. Developed using web technology such as Next.js (which is a React front-end framework). The user interface interacts with the blockchain through a dedicated library or API provided by the blockchain platform. It allows users to interact with the DApp, view data stored on the blockchain, and send transactions or call smart contracts.
            </p>
            <p className="introduce-text">
              &#09;The back-end of a full-stack blockchain DApp includes the server-side infrastructure that supports the application logic and communication with the blockchain network. It involves the development of smart contracts, which are self-executing contracts with predetermined rules and conditions encoded in the blockchain. Smart contracts are often written in programming languages such as Solidity (for Ethereum).
            </p>
            <p className="introduce-text">
              &#09;In this project, we will build operations by writing Smart Contract with Solidity, using Hardhat to deploy Smart Contract on Ethereum, then we also need a DApp (Decentralized Application) user interface using NextJS for interaction. with Smart Contract. Build API using NodeJS platform and ExpressJS framework, combining MongoDB to store data. Use Metamask e-wallet to connect user wallets to the project.
            </p>
          </section>

          <section id="getting-started">
            <h2 className="doc-title">Getting Started</h2>
            <p>
              To get started with the project, follow these simple steps:
            </p>
            <ol>
              <li>git clone https://github.com/tqnguyen19it3/graduation_project.git</li>
              <li>Configure the project settings.</li>
              <li>Update the config.env file </li>
              <li>Run the project locally.</li>
            </ol>
          </section>

          <section id="features">
            <h2 className="doc-title">Features</h2>
            <ul>
              <li>
                <h3>Feature 1</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </li>
              <li>
                <h3>Feature 2</h3>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </li>
              <li>
                <h3>Feature 3</h3>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
              </li>
            </ul>
          </section>

          <section id="result">
            <h2 className="doc-title">Result</h2>
            <p>
              Expected results of the project:
            </p>
            <p className="introduce-text">
              It is a complete Web3.0 product that is fully functional and aesthetically pleasing. Build a web3 API which can provide users to upload NFTs to IPFS and allow them to make API requests to fetch all IPFS blockchain smart contract data.
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
