const NFT = require("../Models/nftModel");
const User = require("../Models/userModel");
const { userCreateNFTValidate } = require('../validations/validation');
const { sendMailCreateNFT } = require('../helpers/sendMail');

// [GET] / GET ALL NFT
exports.getAllNfts = async (req, res, next) => {
    try {
        const nfts = await NFT.find();
        // SEND RESPONSE
        res.status(200).json({
            status: "success",
            results: nfts.length,
            data:{
                nfts,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', error: 'Internal server error' });
    }
};

// [GET] / GET NFT DETAILS
exports.getNft = async (req, res, next) => {
    try {
        const nft = await NFT.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data:{
                nft,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', error: 'Internal server error' });
    }
};

// [POST] / CREATE NFT
exports.createNft = async (req, res, next) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', error: 'Internal server error' });
    }
};

// [GET] / GET NFTs CREATED BY USER
exports.getNftCreatedByUser = async (req, res, next) => {
    try {
        // check user exits
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: "This user could not be found", 
            });
        }

        const NFTCreatedByUser = await NFT.find({ email: user.email }).exec();

        res.status(200).json({
            status: "success",
            data:{
                NFTCreatedByUser,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', error: 'Internal server error' });
    }
};