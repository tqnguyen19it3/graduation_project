const express = require("express");
const router = express.Router();

// Controllers
const nftController = require("../Controllers/nftController");

router.route("/").get(nftController.getAllNfts).post(nftController.createNft);
router.route("/:id").get(nftController.getNft);
router.route("/nft-created-by-user/:userId").get(nftController.getNftCreatedByUser);

module.exports = router;