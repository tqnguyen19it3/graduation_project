import React, { useState } from "react";
import Image from "next/image";
import Style from "./Card.module.css";
import images from "../Image/client/index";

const Card = ({ setNotification, image, index }) => {
    return (
        <div class={Style.card}>
            <div class={Style.content}>
                <a href={`/image/${image.imageID}`}>
                    <p>
                        <img
                            className= {Style.image}
                            src={image.image}
                            alt="image"
                            width={250}
                            height={200}
                        />
                    </p>
                </a>
                <span class={Style.para}>
                    <Image
                        className="avatar_img"
                        src={images[`client${index + 1}`]}
                        width={40}
                        height={40}
                        alt="image"
                    />
                    <small
                        className={Style.para_small}
                        onClick={() => (
                            setNotification("Successfully copied"),
                            navigator.clipboard.writeText(image.owner)
                        )}
                    >
                        {image.owner.slice(0, 25)}...
                    </small>
                </span>

                <span>
                    CreatedAt: {new Date(image.createdAt * 1000).toDateString()}
                    <small className={Style.number}>#{image.imageID}</small>
                </span>
                <small class={Style.para}>{image.description.slice(0, 80)}..</small>
                <button
                    onClick={()=> (
                        setNotification("Image URL is Successfully copied"),
                        navigator.clipboard.writeText(image.image)
                    )}
                    class={Style.btn}
                >
                    Copy URL
                </button>
            </div>
        </div>
    );
};

export default Card;