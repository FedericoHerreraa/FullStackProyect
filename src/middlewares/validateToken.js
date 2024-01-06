import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequire = (req, res, next) => {
    const { token }  = req.cookies

    if (!token) {
        return res.status(401).json({ message: "No token found" })
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) res.status(403).json({ message: "Invalida token" })

        req.user = user
        next()
    })

}