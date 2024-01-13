// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract nftsIPFS {
    address payable contractOwner = payable(0x3b778Fe2F9A48471B2911d70A14d337666601518); //Là địa chỉ của chủ sở hữu hợp đồng
    uint256 public listingPrice = 0.025 ether; //Là giá niêm yết cho việc tạo một hình ảnh NFT
    struct NFTs { //Cấu trúc NFTs được sử dụng để lưu trữ thông tin về mỗi NFT,
        string title;
        string description;
        string email;
        string category;
        uint256 fundraised;
        address creator;
        string image;
        uint256 timestamp;
        uint256 id;
    }

    mapping (uint256 => NFTs) public nftImages; //Là một ánh xạ (mapping) giữa ID của hình ảnh và thông tin của NFT tương ứng.

    uint256 public imagesCount = 0; // Biến đếm số lượng hình ảnh NFT đã được tải lên, dùng làm ID luôn

    // Hàm này được sử dụng để tải lên một hình ảnh NFT mới lên blockchain và trả về một số thông tin chi tiết của NFT đã tải lên dưới dạng một tuple string(kiểu dữ liệu chuỗi bao gồm nhiều các thành phần có kiểu dữ liệu khác nhau).
    function uploadIPFS(address _creator, string memory _image, string memory _title, string memory _description, string memory _email, string memory _category) public payable returns(
        string memory,
        string memory,
        string memory,
        address,
        string memory
    ){
        imagesCount++;
        NFTs storage nft = nftImages[imagesCount]; // truy xuất thông tin về NFT từ mapping nftImages với Id là biến đếm và lưu trữ nó vào biến nft có dạng struct NFTs khai báo ở trên.

        nft.title = _title;
        nft.creator = _creator;
        nft.description = _description;
        nft.email = _email;
        nft.category = _category;
        nft.image = _image;
        nft.timestamp = block.timestamp;
        nft.id = imagesCount;

        return(
            _title,
            _description,
            _category,
            _creator,
            _image
        );
    }

    //Hàm này trả về một mảng các thông tin chi tiết về tất cả NFTs đã tải lên.
    function getAllNFTs() public view returns (NFTs[] memory){
        uint256 itemCount = imagesCount;
        uint256 currentIndex = 0;

        NFTs[] memory items = new NFTs[](itemCount); // tạo mảng động với kích thước là số lượng NFT đã tải lên và Kiểu dữ liệu thuộc NFTs là một struct được định nghĩa trong smart contract
        for (uint256 i = 0; i < itemCount; i++) {  // sử dụng vòng lặp để lấy thông tin từ mỗi NFT và thêm vào mảng items.
            uint256 currentId = i + 1;
            NFTs storage currentItem = nftImages[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    //Hàm này trả về thông tin chi tiết về một NFT cụ thể dựa trên ID. Đầu vào là ID đầu ra là Một tuple string chứa thông tin về NFT
    function getImage(uint256 id) external view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        uint256,
        address,
        string memory,
        uint256,
        uint256
    ){
        NFTs memory nfts = nftImages[id];
        return(
            nfts.title,
            nfts.description,
            nfts.email,
            nfts.category,
            nfts.fundraised,
            nfts.creator,
            nfts.image,
            nfts.timestamp,
            nfts.id
        );
    }

    // Hàm này cập nhật giá niêm yết của hợp đồng. Chỉ chủ sở hữu hợp đồng mới có thể thay đổi giá niêm yết.
    function updateListingPrice(uint256 _listtingPrice, address owner) public payable {
        require(
            contractOwner == owner,
            "Only contract owner can update listing price."
        );
        listingPrice = _listtingPrice;
    }

    // Hàm này được sử dụng để quyên góp tiền cho một hình ảnh NFT cụ thể.
    function donateToImage(uint256 _id) public payable {
        uint256 amount = msg.value;

        NFTs storage nft = nftImages[_id];

        (bool sent,) = payable(nft.creator).call{value: amount}(""); //Gửi số tiền quyên góp đến địa chỉ của người tạo NFT

        if(sent){ //Nếu giao dịch thành công, cập nhật số tiền quyên góp vào trường fundraised của NFT.
            nft.fundraised = nft.fundraised + amount;
        }
    }

    //Hàm này cho phép chỉ chủ sở hữu rút toàn bộ số dư trong hợp đồng.
    function withdraw(address _owner) external {
        require(_owner == contractOwner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        contractOwner.transfer(balance); //Chuyển toàn bộ số dư đó đến địa chỉ của chủ sở hữu hợp đồng 
        
    }
}