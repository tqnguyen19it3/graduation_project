import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {
  useAddress,
  useContract,
  useMetamask,
  //NEW HOOKS FOR FRONTEND
  useDisconnect,
  useSigner,
}  from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract(
        "0x8178a7446fBFAe95DE89Dc5cbfcb994aC0d67341"
    );

    const address = useAddress();
    const connect = useMetamask();

    //FRONTEND
    const disconnect = useDisconnect();
    const signer = useSigner();
    const [userBalance, setUserBalance] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try{
            //USER BALANCE
            const balance = await signer?.getBalance();
            const userBalance = address
            ? ethers.utils.formatEther(balance?.toString())
            : "";
            setUserBalance(userBalance);
        } catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    //CONTRACT FUNCTION
    //---UPLOAD
    const UploadImage = async (imageInfo) => {
        const { title, description, email, category, image } = imageInfo;
        try{
            //CHARGE
            const listingPrice = await contract.call("listingPrice");
            const createNFTs = await contract.call(
                "uploadIPFS",
                [address, image, title, description, email, category],
                {
                    value: listingPrice.toString(),
                }
            );
            
            //API CALL
            const response = await axios({
                method: "POST",
                url: `/api/v1/NFTs`,
                data: {
                    title: title,
                    description: description,
                    category: category,
                    image: image,
                    address: address,
                    email: email,
                },
            });

            setLoading(false);
            window.location.reload();
        } catch (err) {
            console.error("contract call failure", err);
            alert("Contract call failure! Please try again")
            setLoading(false);
            window.location.reload();
        }
    };
    
    // GET CONTRACT DATA
    const getUploadedImages = async() => {
        //ALL IMAGES
        const images = await contract.call("getAllNFTs");
        // TOTAL UPLOAD
        const totalUpload = await contract.call("imagesCount");
        //LISTING PRICE
        const listingPrice = await contract.call("listingPrice");
        const allImages = images.map((images, i) => ({
            owner: images.creator,
            title: images.title,
            description: images.description,
            email: images.email,
            category: images.category,
            fundraised: images.fundraised,
            image: images.image,
            imageID: images.id.toNumber(),
            createdAt: images.timestamp.toNumber(),
            listedAmount: ethers.utils.formatEther(listingPrice.toString()),
            totalUpload: totalUpload.toNumber(),
        }));

        return allImages;
    };
    
    // GET SINGLE IMAGE
    const singleImage = async(id) => {
        try {
            const data = await contract.call("getImage", [id]);
            const image = {
                title: data[0],
                description: data[1],
                email: data[2],
                category: data[3],
                fundRaised: ethers.utils.formatEther(data[4].toString()),
                creator: data[5],
                imageURL: data[6],
                createdAt: data[7].toNumber(),
                imageId: data[8].toNumber(),
            };
            
            return image;
        } catch (error){
            console.log(error);
        }
    };
    
    //DONATE
    const donateFund = async ({ amount, Id }) => {
        try {
            const transaction = await contract.call("donateToImage", [Id], {
                value: amount.toString(),
            }); 
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("Contract call failure! Please try again");
            window.location.reload();
        }
    };
    
    //GET API DATA
    const getAllNftsAPI = async () => {
        const response = await axios({
            method: "GET",
            url: "/api/v1/NFTs",
        });
    };
       
    // SINGLE NFT API
    const getSingleNftsAPI = async (id) => {
        const response = await axios({
            method: "GET",
            url: `/api/v1/NFTs/${id}`,
        });
    };


    return (
        <StateContext.Provider
            value={{
                // CONTRACT
                address,
                contract,
                connect,
                disconnect,
                userBalance,
                setLoading,
                loading,
                // FUNCTION
                UploadImage,
                getUploadedImages,
                donateFund,
                singleImage,
                // API
                getAllNftsAPI,
                getSingleNftsAPI,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
  

