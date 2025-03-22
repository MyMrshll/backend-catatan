const verifyAdmin = (req, res, next) => {
    if (req.user.username == "ferta" || req.user.username == "reval") {
      return next();
    }
    return res.status(403).json({ message: "Forbidden: Admin access required" });
}

module.exports = verifyAdmin