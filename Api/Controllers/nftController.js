const NFT = require("../Models/nftModel");
const { userCreateNFTValidate } = require('../validations/validation');
const { sendMailCreateNFT } = require('../helpers/sendMail');

// [GET] / GET ALL NFT
exports.getAllNfts = async (req, res, next) => {
    const nfts = await NFT.find();
    // SEND RESPONSE
    res.status(200).json({
        status: "success",
        results: nfts.length,
        data:{
            nfts,
        }
    });
};

// [GET] / GET NFT DETAILS
exports.getNft = async (req, res, next) => {
    const nft = await NFT.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data:{
            nft,
        }
    });
};

// [POST] / CREATE NFT
exports.createNft = async (req, res, next) => {

    const { error } = userCreateNFTValidate(req.body);
    if(error){
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }
    
    const newNft = await NFT.create(req.body);

     // send mail to user
    await sendMailCreateNFT(
        newNft,
        "Create NFT",
        `<p>Notice of successful submission!</p>`
    );

    res.status(201).json({
        status: "success",
        data:{
            newNft,
        }
    });
};