import Jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    Jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json('Token Invalid!!!')
      req.user = user
      next()
    })
  } else {
    return res.status(401).json(`You're not authenticated!!!`)
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json(`You're not allowed to perform this task!!!`)
    }
  })
}
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).json(`You're not allowed to perform this task!!!`)
    }
  })
}

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }
