import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Please provide your name"],
        },
        email: {
            type: String,
            required: [true, "Please provide your email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            select: false
        },
        role: {
            type: String,
            required: true,
            enum: ['employer', 'job-seeker'],
        },
        profilePic:{
            data: { type: Buffer, default: null },
            contentType: { type: String },
        },
        skills: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
        headline: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        state: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        },
        mobile: {
            type: String,
            default: "",
        },
        linkedIn: {
            type: String,
            default: "",
        },
        resume: {
            filename: { type: String },
            contentType: { type: String },
            data: { type: Buffer, default: null },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

//  method to remove password from the user object, however it can simply be done by using the select property in the password field
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};


export default User;