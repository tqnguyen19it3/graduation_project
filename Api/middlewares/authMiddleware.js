const jwt = require('jsonwebtoken');

const isAuthentication = (req, res, next) => {
    try {
        // 1. Get token from client
        const bearerHeader = req.headers['authorization'];
        if(!bearerHeader){
            return res.status(404).json({
                status: 'fail',
                message: "Unauthorized",
            });
        }
        const accessToken = bearerHeader.split(' ')[1];
        // 2. verify token
        const jwtDecoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        if(!jwtDecoded){
            return res.status(404).json({
                status: 'fail',
                message: "Unauthorized",
            });
        }
        req.payload = jwtDecoded;
        next();
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error.name + ": " + error.message});
    }
}

module.exports = {
    isAuthentication,
}