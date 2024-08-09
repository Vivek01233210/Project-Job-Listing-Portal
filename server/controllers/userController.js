import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from 'fs';

// make a register controller
export const register = async (req, res) => {
    const { fullName, role, email, password } = req.body;
    // console.log(req.body);
    if (!fullName || !role || !email || !password) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    // check if the user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User with this email already exists' });

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // save the user
    const user = await User.create({
        fullName,
        role,
        email,
        password: hashedPassword,
    });

    // send a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1-day
        secure: process.env.NODE_ENV === 'production',
    });

    return res.status(201).json({ isAuthenticated: true, user });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    // check if the user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) res.status(400).json({ error: 'Invalid credentials' });

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: 'Invalid credentials' });

    // save user in the req object
    req.user = { id: user._id, role: user.role, fullName: user.fullName, email: user.email };

    // send a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1-day
        secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({
        isAuthenticated: true,
        user: { id: user._id, role: user.role, fullName: user.fullName, email: user.email }
    });
};

// logout route
export const logout = (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    return res.status(200).json({ message: "logout success" })
};

export const checkUser = async (req, res, next) => {
    const token = req.cookies["token"];

    if (!token) {
        return res.status(200).json({ isAuthenticated: false, user: null });
    }
    try {
        // console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find the user
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ isAuthenticated: false });
        }

        return res.status(200).json({ isAuthenticated: true, user });

    } catch (error) {
        return res.status(401).json({ isAuthenticated: false, error });
    }
};

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
}

export const updateProfile = async (req, res) => {
    // console.log(req.user)
    const user = await User.findByIdAndUpdate(req.user._id, req.body,
        { new: true, runValidators: true });

    // console.log(user);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
}

export const updateResume = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded or file size exceeds limit' });
        }
        console.log(file);
        const fileData = file.buffer;

        // Create the file document
        const fileDocument = {
            filename: file.originalname,
            contentType: file.mimetype,
            data: fileData,
        }

        const user = await User.findByIdAndUpdate(req.user._id, { resume: fileDocument },
            { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const fetchResume = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user || !user.resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        res.set('Content-Type', user.resume.contentType);
        res.send(user.resume.data);
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}