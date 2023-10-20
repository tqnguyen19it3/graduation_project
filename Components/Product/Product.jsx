import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import Image from "next/image";
import { saveAs } from "file-saver";
import Style from "./Product.module.css";
import BTNStyle from "../Button/Button.module.css";
import client from "../Image/client/index";
import { Donate } from "../index";

const Product = ({
  setNotification,
  setSupport,
  donateAmount,
  setLoading,
  image,
}) => {
  const handleClick = () => {
    let url = `${image?.imageURL}`;
    saveAs(url, `${image?.title}`);
  };

  const [donate, setDonate] = useState(false);
  return (
    <div className={Style.Product}>
      <Helmet>
        <title>NFT Details</title>
      </Helmet>
      <div className= {Style.image}>
        <img className={Style.image_img} src={image?.imageURL} alt="image" />
      </div>
      <div className={Style.detail}>
        <div className={Style.detail_box}>
          <h1>{image?.title}</h1>
          <p>{image?.description}</p>
          <p className={Style.info}>
            <span>Category: {image?.category}</span> {""}{" "}
            <span>Image ID: #{image?.imageId}</span> {""}{" "}
            <span>
              CreatedAt: {new Date(image?.createdAt * 1000).toDateString()}
            </span>
          </p>
          <p className={Style.info}>
            <span>
              Donation: {""} {image?.fundRaised} MATIC
            </span>{" "}
          </p>
          <p>Contact Creator: {image?.email}</p>
            <span class= {Style.para}>
              <Image
                className="avatar_img"
                src={client[`client${1}`]}
                width={40}
                height={40}
                alt="image"
              />
              <small
                className={Style.para_small}
                onClick={() => (
                  setNotification("The wallet address has been copied successfully"),
                  navigator.clipboard.writeText(image?.creator)
                )}
              >
                {image?.creator.slice(0, 30)}..
              </small>
            </span>
          </div>
          <button
            onClick={() => (
              setNotification("The image URL has been copied successfully"),
              navigator.clipboard.writeText(image?.imageURL)
            )}
            class={BTNStyle.button}
          >
            <span class={`${BTNStyle.button_content} ${Style.btn}`}>
              Copy URL{" "}
            </span>
          </button>
          {/* //DOWNLOAD */}
          <span className={Style.space}></span>
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                setNotification("Thanks for downloading")
              )
            }
            class={BTNStyle.button}
          >
            <span
              onClick={handleClick}
              class={`${BTNStyle.button_content} ${Style.btn}`}
            >
              Download Image{" "}
            </span>
          </button>
          {/* //DONATE */}
          <span className={Style.space}></span>
          <button onClick={() => setDonate(true)} class={BTNStyle.button}>
            <span class={`${BTNStyle.button_content} ${Style.btn}`}>Donate </span>
          </button>
        </div>
        {donate && (
          <div className="form">
            <div className="form_inner">
              <Donate
                setLoading={setLoading}
                donateAmount={donateAmount}
                setDonate={setDonate}
                setSupport={setSupport}
              />
            </div>
          </div>
        )}
      </div>
  );
};

export default Product;
