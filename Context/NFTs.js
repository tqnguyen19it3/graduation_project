//File NFTs.js này cung cấp một cách để quản lý các state và các hàm tương tác với hợp đồng thông minh và API để tạo và quản lý NFTs. Các thành phần con có thể sử dụng hook useStateContext để truy cập và sử dụng các giá trị và hàm được cung cấp bởi file này.
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

const StateContext = createContext(); //Tạo một context có tên StateContext để chứa state và các hàm liên quan.

export const StateContextProvider = ({ children }) => {
    //Sử dụng các hooks để lấy thông tin như địa chỉ, hợp đồng, và các hàm tương tác với MetaMask.
    const { contract } = useContract(
        "0x8178a7446fBFAe95DE89Dc5cbfcb994aC0d67341" //địa chỉ chủ sở hữu nền tảng
    );

    const address = useAddress();
    const connect = useMetamask();

    //FRONTEND
    const disconnect = useDisconnect();
    const signer = useSigner(); // Là đối tượng signer từ MetaMask, được sử dụng để ký các giao dịch 
    const [userBalance, setUserBalance] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => { //sử dụng để lấy dữ liệu (số dư tài khoản người dùng) từ blockchain và cập nhật state.
        try{
            //USER BALANCE
            const balance = await signer?.getBalance();
            const userBalance = address
            ? ethers.utils.formatEther(balance?.toString()) //chuyển đổi số dư từ định dạng wei (đơn vị cơ bản của đồng Ethereum) sang đơn vị Ether (đơn vị tiền tệ của Ethereum)
            : "";
            setUserBalance(userBalance);
        } catch(error){
            console.log(error);
        }
    };
    useEffect(() => { //cập nhật giá trị số dư người dùng trong state của component
        fetchData();
    }, []);

    //CONTRACT FUNCTION
    //---UPLOAD Hàm UploadImage sử dụng các hdtm mà chúng ta đã triển khai để tải NFT lên blockchain và gửi dữ liệu liên quan đến server thông qua API.
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
    
    // GET CONTRACT DATA- Hàm getUploadedImages truy vấn thông tin về tất cả hình ảnh NFT đã được tải lên từ blockchain.
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
    
    // GET SINGLE IMAGE - Hàm singleImage truy vấn thông tin chi tiết của một hình ảnh NFT dựa trên ID từ blockchain
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
    
    //DONATE - Hàm donateFund được sử dụng để quyên góp tiền cho một hình ảnh NFT cụ thể trên blockchain
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
    
    //GET API DATA - hàm để gửi các HTTP requests đến server API để lấy thông tin về NFTs.
    const getAllNftsAPI = async () => {
        const response = await axios({
            method: "GET",
            url: "/api/v1/NFTs",
        });
    };
       
    // SINGLE NFT API - hàm để gửi các HTTP requests đến server API để lấy thông tin về NFTs.
    const getSingleNftsAPI = async (id) => {
        const response = await axios({
            method: "GET",
            url: `/api/v1/NFTs/${id}`,
        });
    };


    return (
        //Return một provider với giá trị là các biến state và các hàm được định nghĩa bên trong context.
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
//Export một hook useStateContext để sử dụng trong các component khác cho việc truy cập các biến state và hàm từ context.
export const useStateContext = () => useContext(StateContext);
  

