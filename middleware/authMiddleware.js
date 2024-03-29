export const protect = (req, res, next) => {
    const { user } = req.session

    if (!user) {
        return res.status(401).json({ msg: "unauthorized" })
    }

    req.user = user

    next()
}