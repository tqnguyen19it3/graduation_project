/** @type import('hardhat/config').HardhatUserConfig */

// const PRIVATE_KEY = "dcfcb3154f52ba92f8813b9a2ee29c236261df3de39625e17144f84c4fbb8a0f";
const PRIVATE_KEY = "2213a33c0a006f7ef10f1a8490798ffcecee31c8bb106c80684ac570fca39b20";
const RPC_URL = "https://rpc.ankr.com/polygon_mumbai";
module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
      chainId: 80001, // là ID của chuỗi mạng Polygon Mumbai.
    },
    polygon_mumbai: { // khi chạy Hardhat sẽ sử dụng thông tin này và gửi yêu cầu tới nút RPC của PM để ký giao dịch
      url: "https://rpc.ankr.com/polygon_mumbai", //Nút RPC là 1 endpoint trên mạng blockchain. thêm endpoint vào dự án để kích hoạt tương tác blockchain.
      accounts: [`0x${PRIVATE_KEY}`], // Tài khoản mà Hardhat sẽ sử dụng
    },
  },
  solidity: { // cấu hình phiên bản và Solidity compiler (Có bật trình tối ưu hóa với 200 lượt chạy).
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};



