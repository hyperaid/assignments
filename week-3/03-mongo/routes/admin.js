const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course}=require('../db/index');

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const usename = req.body.usename;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    const contact_number = req.body.contact_number;
    const newAdmin = new Admin({
        usename:usename,
        password:password,
        name:name,
        email:email,
        contact_number:contact_number
    });
    Admin.create(newAdmin,(err,newAdmin)=>{
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(201).send("successfully created new admin");
        }
    }
    );
}
);



router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const content = req.body.content;
    const admin = req.body.admin;
    const user = [];
    const rating=NULL;
    const duration=req.body.duration;
    const category=req.body.category;
    const created_at=Date.now();


    const newCourse = new Course({
        name:name,
        description:description,
        price:price,
        content:content,
        admin:admin,
        user:user,
        rating:rating,
        duration:duration,
        category:category,
        created_at:created_at
    });
    const course=Course.create(newCourse,function (err,newCourse){
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(201).send("successfully created new course");
        }
    
    })



});

router.get('/courses', adminMiddleware, (req, res) => {
    const admin = req.body.admin;
    try{
        if(!admin){
            res.status(400).send("admin not found");
        }
        else{
            res.status(200).send(Course.find({admin:admin}));
        }
    }
    catch(err){
        res.status( 400).send(err);
    }



});

module.exports = router;