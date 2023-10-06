import React from "react";
import Image from "next/image";
import { Delete, UploadIcon, File } from "../SVG/index";
import Style from "./Upload.module.css";

const Upload = ({ onImageChange, display, retrieveFile }) => {
    return (
        <div class={Style.container}>
            <div class={Style.header}>
                {display == null ? (
                    <>
                        <UploadIcon />
                        <p>Browse File to upload!</p>
                    </>
                ) : (
                    <p>
                        <Image
                            className={Style.image}
                            src={display}
                            alt="image"
                            width={200}
                            height={200}
                        />
                    </p>
                )}
            </div>
            <label for="file" class={Style.footer}>
                <File />
                <p>Not selected file</p>
                <Delete />
            </label>
            <input
                id="file"
                onChange={(e) => (onImageChange(e), retrieveFile(e))}
                type="file"
            />
        </div>
    );
};

export default Upload;     