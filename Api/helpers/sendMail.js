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
        console.log(error);
    }
};

const sendMailCreateNFT = async (name, subject, html) => {
    // try {
    //     const transporter = nodemailer.createTransport({
    //         host: "smtp.gmail.com",
    //         port: 465,
    //         secure: true,
    //         auth: {
    //             user: process.env.GMAIL_ACCOUNT,
    //             pass: process.env.GMAIL_PASSWORD
    //         }
    //     });

    //     const mailGenerator = new mailGen({
    //         theme: "cerberus",
    //         product: {
    //             name: "VKU",
    //             logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Logo_tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng_Vi%E1%BB%87t_-_H%C3%A0n%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_N%E1%BA%B5ng.png",
    //             link: "http://localhost:3000/"
    //         },
    //     });
    
    //     const emailContent = {
    //         body: {
    //             name: candidate.name,
    //             intro: "Congratulations on your successful application, we will review and approve your application. Please wait for the earliest notification from us",
    //             table: {
    //                 data: [
    //                     {
    //                         key: 'Name',
    //                         value: candidate.name
    //                     },
    //                     {
    //                         key: 'Email',
    //                         value: candidate.email
    //                     },
    //                     {
    //                         key: 'Phone Number',
    //                         value: candidate.phoneNumber
    //                     },
    //                     {
    //                         key: 'Date of Birth',
    //                         value: candidate.dob
    //                     },
    //                     {
    //                         key: 'Gender',
    //                         value: candidate.gender
    //                     },
    //                     {
    //                         key: 'More Info',
    //                         value: candidate.moreInfo
    //                     }
    //                 ]
    //             },
    //             outro: "If you have not submitted any request before, please ignore this email",
    //         },
    //     };
    
    //     const mailOptions = {
    //         from: "noreply@vku.udn.vn",
    //         to: candidate.email,
    //         subject: subject,
    //         text: html,
    //         html: mailGenerator.generate(emailContent),
    //     };
    
    //     await transporter.sendMail(mailOptions);
    // } catch (error) {
    //     throw new Error("Failed to send email");
    // }
};

module.exports = { 
    sendMailCreateAccount,
    sendMailCreateNFT,
}