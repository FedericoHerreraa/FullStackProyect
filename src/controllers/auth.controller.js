import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req,res) => {
    try {
        const { email, password, username } = req.body
        
        const found = await User.findOne({ email })
        if (found) return res.status(400).json({ message: ["La cuenta ya existe"]})

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })
        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const login = async (req,res) =>  {
    const { email, password } = req.body
    try {
        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(500).json({ error: ['User not found']})

        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) return res.status(400).json({ error: ['Incorrect password'] })

        const token = await createAccessToken({ id: userFound._id })

        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const logout = async (req,res) => {
    res.cookie('token', '', {
        expires: new Date(0),
    });
    return res.sendStatus(200)
}

export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "User not found" })
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}   

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: "No autorizado" })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" })
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "No autorizado" })

        return res.json({
            id: userFound._id,
            email: userFound.email,
            username: userFound.username
        });
    })
}