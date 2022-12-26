import User from "../models/User.js";
import bcrypt from "bcrypt"


export const signUp = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword
        })
        req.session.user = user
        res.status(201).json({ msg: "you're signed" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: "error" })
    }
}

export const signIn = async (req, res) => {
    const { username, password } = req.body

    const candidateUser = await User.findOne({ username })

    if (!candidateUser) {
        return res.status(400).json({ msg: "there's no user with following username:" + username })
    }

    const isPasswordMatch = await bcrypt.compare(password, candidateUser.password)

    if (!isPasswordMatch) {
        return res.status(400).json({ msg: "invalid credentials" })
    }
    req.session.user = candidateUser
    return res.status(200).json({ msg: "you logged in" })
}