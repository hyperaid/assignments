const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    name: String,
    contact_number: Number,
    username: String, // corrected 'usename' to 'username'
    password: String,
    email: String,
    course: [{
        type: mongoose.Schema.Types.ObjectId, // corrected 'ObkectId' to 'ObjectId'
        ref: 'Course'
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId, // corrected 'ObkectId' to 'ObjectId'
        ref: 'User'
    }],
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    name: String,
    contact_number: Number,
    username: String, // corrected 'usename' to 'username'
    password: String,
    email: String,
    course: [{
        type: mongoose.Schema.Types.ObjectId, // corrected 'ObkectId' to 'ObjectId'
        ref: 'Course'
    }],
    admin: [{
        type: mongoose.Schema.Types.ObjectId, // corrected 'ObkectId' to 'ObjectId'
        ref: 'Admin'
    }],
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    name: String,
    description: String,
    admin: [{
        type: mongoose.Schema.Types.ObjectId, // corrected 'ObkectId' to 'ObjectId'
        ref: 'Admin'
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId, // corrected 'ObkectId' to 'ObjectId'
        ref: 'User'
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    content: [{
        type: String
    }],
    price: Number,
    rating: Number,
    duration: Number,
    category: String,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
