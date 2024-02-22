import jwt from 'jsonwebtoken'

class Token {
    generateAccessToken(userId) 
    {
        return jwt.sign(
            {
                userId,
                createdAt: Number(Date.now())
            }, 
            process.env.JWT_ACCESS_KEY, 
            {
                expiresIn: '1d'
            }
        )
    }

    generateRefreshToken(userId) 
    {
        return jwt.sign(
            { 
                userId,
                createdAt: Number(Date.now())
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: 2592000
            }
        )
    }

    async verifyAccessToken(accessTokenStr) 
    {
        const data = jwt.verify(accessTokenStr, process.env.JWT_ACCESS_KEY)

        if (!data.userId) {
            throw new jwt.JsonWebTokenError('Incorrect ACCESS token: field \'userId\' is empty')
        }

        if (!data.createdAt) {
            throw new jwt.JsonWebTokenError('Incorrect ACCESS token: field \'createdAt\' is empty')
        }

        return data;
    }

    async verifyRefreshToken(refreshTokenStr) 
    {
        const data = jwt.verify(refreshTokenStr, process.env.JWT_REFRESH_KEY)

        if (!data.userId) {
            throw new jwt.JsonWebTokenError('Incorrect REFRESH token: field \'userId\' is empty')
        }

        if (!data.createdAt) {
            throw new jwt.JsonWebTokenError('Incorrect REFRESH token: field \'createdAt\' is empty')
        }

        return data;
    }
}

const TokenUtil = new Token()

export default TokenUtil