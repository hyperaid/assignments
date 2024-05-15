const {User} = require('../db/index');
function userMiddleware(req, res, next) {
    // Implement user auth logic
    const username = req.headers.username;
    const password = req.headers.password;
    if(User.findone({username:username,password:password,} )){
        next();
    }
    else{
        res.status(401).send("Unauthorized");
    }

    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;