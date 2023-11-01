import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import {
  Card,
  Header,
  Footer,
  Notification,
  Logo,
  Product,
} from "../../Components";
import { useStateContext } from "../../Context/NFTs";

const imageDetail = () => {
  const {
    address,
    contract,
    getUploadedImages,
    setLoading,
    loading,
    donateFund,
    singleImage,
  } = useStateContext();

  //URL QUERY
  const router = useRouter();
  const { query } = router;
  const [notification, setNotification] = useState("");
  const [support, setSupport] = useState("");
  const [image, setImage] = useState();
  const [otherImages, setOtherImages] = useState([]);

  const fetchImages = async () => {
    const oneImage = await singleImage(query.image * 1);
    const images = await getUploadedImages() ;
    setImage(oneImage);
    const otherImg = images.filter((item) =>{
      return item.imageID !== (query.image * 1);
    });
    setOtherImages(otherImg);
  }
  useEffect(() => {
    if (contract) fetchImages();
  }, [address, contract]);

  const donateAmount = async () => {
    setLoading(true);
    await donateFund({
      amount: ethers.utils.parseUnits(support, 18),
      Id: query.image,
    });
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
        {image == undefined ? (
          <Logo />
        ) : (
          <Product
            setLoading={setLoading}
            donateAmount={donateAmount}
            setNotification={setNotification}
            setSupport={setSupport}
            image={image}
          />
        )}
      <div className="card">
        {otherImages.map((image, i) => (
          <Card
            key={i + 1}
            index={i}
            image={image}
            setNotification={setNotification}
          />
        ))}
      </div>
      <Footer />

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
    </div>
  );
};

export default imageDetail;
