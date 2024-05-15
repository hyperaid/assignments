const { Admin } = require('../db/index.js');


// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    const username = req.headers.username;
    const password = req.headers.password;

    if(await Admin.findone({username:username,password:password,} )){

        next();

    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}
    else{
        res.status(401).send("Unauthorized");
    }
}


module.exports = adminMiddleware;
