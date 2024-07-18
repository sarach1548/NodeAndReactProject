const fsPromises = require('fs').promises;
const { User } = require('../models/users');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    const recieveToken =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if (!recieveToken) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const user = await User.findOne({
            where: {
                token: recieveToken
            }
        });
        if (user) { next(); }
        else {
            return res.status(401).send("Invalid Token");
        }
    } catch (err) {
        res.json("ERROR! " + err);
    }
};
//add tokenfor check to the definition of the function....
const checkTokenExpiration=async(req,res,next)=>{
    try{

        const decoded = jwt.verify(token, JWT_SECRET);

    }catch{

    }
}
module.exports = { verifyToken };
