const express = require("express");
const nftController = require("../Controllers/nftController");
const router = express.Router();

router.route("/").get(nftController.getAllNfts).post(nftController.createNft);
router.route("/:id").get(nftController.getNft);
router.route("/nft-created-by-user/:id").get(nftController.getNftCreatedByUser);

module.exports = router;