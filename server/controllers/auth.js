import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import * as fs from "node:fs";
import geoip from "geoip-lite";

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Register -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            description,
            password,
            email,
            followers,
            followees,
            picture,
            pictureType,
            tempPath
        } = req.body;
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const username = email.split("@")[0];
        const picturePath = `profile_${username}.${pictureType}`;

        const readStream = fs.createReadStream(tempPath)
        const writeStream = fs.createWriteStream(`public/assets/${picturePath}`);

        readStream.pipe(writeStream);

        readStream.on("error", (err) => {
            res.status(500).json({ error: err.message });
        });
        writeStream.on("error", (err) => {
            res.status(500).json({ error: err.message });
        });

        fs.rm(tempPath, (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }
        });

        let country;
        if(process.env.NODE_ENV === "production") {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            let ipv4Address;

            if(ip.startsWith("::ffff:")) {
                ipv4Address = ip.substring(7);
            }
            else {
                ipv4Address = ip;
            }

            const geo = geoip.lookup(ipv4Address);
            country = geo.country;
        }
        else {
            country = "RO";
        }

        const newUser = new User({
            username,
            firstName,
            lastName,
            description: "",
            password: passwordHash,
            email,
            followers,
            followees,
            location: country,
            picturePath,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }   catch(err) {
            res.status(500).json({ error: err.message });
    }
};

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Login -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export const login = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({ error: "User does not exist." })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    }   catch(err) {
            res.status(500).json({ error: err.message });
    }
};
