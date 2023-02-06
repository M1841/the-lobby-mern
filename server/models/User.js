import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 64,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },
    description: {
        type: String,
        max: 128
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    email: {
        type: String,
        required: true,
        max: 64,
        unique: true
    },
    followers: {
        type: Array,
        default: []
    },
    followees: {
        type: Array,
        default: []
    },
    location: {
        type: String,
        max: 64
    },
    picturePath: {
        type: String,
        default: ""
    }
}, { timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;