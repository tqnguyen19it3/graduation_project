import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./Card.module.css";
import images from "../Image/client/index";
import imagesNFT from "../Image/index";

const Card = ({ setNotification, image, index }) => {
    return (
        <div class={Style.card}>
            <div class={Style.content}>
                {/* <a href={`/image/${image.imageID}`}> */}
                <a href={`/image/1`}>    
                    <p>
                        <Image
                            className= {Style.image}
                            src={imagesNFT.img1}
                            alt="image"
                            width={250}
                            height={200}
                        />
                    </p>
                </a>
                <span class={Style.para}>
                    <Image
                        className="avatar_img"
                        // src={images[`client${index + 1}`]}
                        src={images[`client1`]}
                        width={40}
                        height={40}
                    />
                    <small
                        className={Style.para_small}
                        onClick={() => (
                            setNotification("Successfully copied"),
                            // navigator.clipboard.writeText(image.owner)
                            navigator.clipboard.writeText('Successfully copied')
                        )}
                    >
                        asdasdasdasdasdasdsadasd...
                        {/* {image.owner.slice(0, 25)}... */}
                    </small>
                </span>

                <span>
                    Oct 06 2023
                    {/* CreatedAt: {new Date(image.createdAt * 1000).toDateString()} */}
                    {/* <small className={Style. number}>#{image.imageID}</small> */}
                    <small className={Style.number}>#1</small>
                </span>
                {/* <small class={Style.para}>{image.description.slice(0, 80)}..</small> */}
                <small class={Style.para}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, qui explicabo? Quo voluptate, quia nostrum libero harum explicabo fuga qui enim sed voluptatibus ea expedita unde repellendus reprehenderit nesciunt! Libero...</small>
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