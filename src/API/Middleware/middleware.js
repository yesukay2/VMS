const authpage = (permissions) => {
  return (req, res, next) => {
    if (!permissions.includes(req.user.role)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
};

const authAction = (req, res, next) => {
  next();
};

export default { authAction, authpage };
