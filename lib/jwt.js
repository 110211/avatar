const jwt = require('jsonwebtoken');

const secret = "hoangdeptraivcl";

const createJWTToken = (payload) => {
    return (jwt.sign(payload, secret, {expiresIn: 432000}))
}

const verifyJWTToken = (token) => {
    try {
        const data = jwt.verify(token, secret)
        if (Date.now() >= data.exp * 1000) {
            return false
        } else {
            return data
        }
    } catch (error) {
        return false
    }
}

const getTokenFromHeader = (header) => {
    try {
        return header.split(" ")[1]
    } catch (err) {
        return null
    }
}
module.exports = {
    createJWTToken,
    verifyJWTToken,
    getTokenFromHeader
}