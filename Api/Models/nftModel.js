const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: String,
    email: String,
    address: String,
    image: String    
}, {timestamps: true});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;