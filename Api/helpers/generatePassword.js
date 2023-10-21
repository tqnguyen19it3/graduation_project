async function generateRandomPassword() {
    const passwordLength = 6;
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
    let password = "";
  
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * possibleChars.length);
      password += possibleChars[randomIndex];
    }
  
    return password;
}

module.exports = { generateRandomPassword }