const nodemailer = require("nodemailer");
const mailGen = require("mailgen");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const sendMailCreateAccount = async (toMail, name, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_ACCOUNT,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        const mailGenerator = new mailGen({
            theme: "cerberus",
            product: {
                name: "NFTs API IPFS Web3",
                logo: "https://i.pinimg.com/564x/00/d2/47/00d247ab46fcf887dcebd874b8bba824.jpg",
                link: "http://localhost:3000/"
            },
        });
    
        const emailContent = {
            body: {
                name: name,
                intro: "Congratulations! We are pleased to inform you that you have successfully passed the account registration stage.",
                outro: "If you are not interested, please ignore this email",
            },
        };
    
        const mailOptions = {
            from: "noreply@vku.udn.vn",
            to: toMail,
            subject: subject,
            text: html,
            html: mailGenerator.generate(emailContent),
        };
    
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Failed to send email", error);
    }
};

const sendMailForgetPassword = async (toMail, userName, subject, password, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_ACCOUNT,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        const mailGenerator = new mailGen({
            theme: "cerberus",
            product: {
                name: "NFTs API IPFS Web3",
                logo: "https://i.pinimg.com/564x/00/d2/47/00d247ab46fcf887dcebd874b8bba824.jpg",
                link: "http://localhost:3000/"
            },
        });
    
        const emailContent = {
            body: {
                name: userName,
                intro: "You are receiving this email because we received a request to reset your password for your account.",
                action: {
                    instructions: 'Your new password has been updated below <br><span style="font-size: 32px;">&#128071;</span>',
                    button: {
                        color: '#22BC66',
                        text: password,
                    }
                },
                outro: "If you didn't request to retrieve your forgotten password, please ignore this email",
            },
        };
    
        const mailOptions = {
            from: "noreply@vku.udn.vn",
            to: toMail,
            subject: subject,
            text: password,
            html: mailGenerator.generate(emailContent),
        };
    
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Failed to send email", error);
    }
};

const sendMailCreateNFT = async (nft, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_ACCOUNT,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        const mailGenerator = new mailGen({
            theme: "cerberus",
            product: {
                name: "NFTs API IPFS Web3",
                logo: "https://i.pinimg.com/564x/00/d2/47/00d247ab46fcf887dcebd874b8bba824.jpg",
                link: "http://localhost:3000/"
            },
        });
    
        const emailContent = {
            body: {
                name: nft.email,
                intro: "Congratulations, you have successfully created an NFT on our system, all information about the NFT you just created is below",
                table: {
                    data: [
                        {
                            key: 'Title',
                            value: nft.title
                        },
                        {
                            key: 'Description',
                            value: nft.description
                        },
                        {
                            key: 'Category',
                            value: nft.category
                        },
                        {
                            key: 'Address',
                            value: nft.address
                        },
                        {
                            key: 'Image',
                            value: nft.image
                        },
                    ]
                },
                outro: "If you have not submitted any request before, please ignore this email",
            },
        };
    
        const mailOptions = {
            from: "noreply@vku.udn.vn",
            to: nft.email,
            subject: subject,
            text: html,
            html: mailGenerator.generate(emailContent),
        };
    
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Failed to send email", error);
    }
};

module.exports = { 
    sendMailCreateAccount,
    sendMailForgetPassword,
    sendMailCreateNFT,
}