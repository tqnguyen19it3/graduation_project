const NFT = require("../Models/nftModel");

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

exports.getNft = async (req, res, next) => {
    const nft = await NFT.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data:{
            nft,
        }
    });
};

exports.createNft = async (req, res, next) => {
    const newNft = await NFT.create(req.body);

    res.status(201).json({
        status: "success",
        data:{
            newNft,
        }
    });
};