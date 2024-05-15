const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course}=require('../db/index');

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    const contact_number = req.body.contact_number;
    const course = [];
    // const admin=[];
    const newUser = new User({
        username:username,
        password:password,
        name:name,
        email:email,
        contact_number:contact_number,
        course:course
        // admin:admin
    });
    try{
        await User.create(newUser);
        res.status(201).send("successfully created new user");
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    try{
        const courses=[];
        courses=Course.find({});
        res.status(200).send(courses);
    }
    catch(err){
        res.status(400).send(err);  
    }

});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;
    try{
        const user = User.findOne({username:username});
        const course = Course.findOne({_id:courseId});
        user.course.push(course);
        course.user.push(user);
        res.status(200).send("Course purchased successfully");
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    try{
        const user = User.findOne({username:username});
        const courses = Course.find({user:user});
        res.status(200).send(courses);

    
    }
    catch(err){
        res.status(400).send(err);
    }

});

module.exports = router