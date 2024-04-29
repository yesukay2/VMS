const checkParamRole = (req, res, next) => {
  try {
    const paramCheck = req.params.role;
    if (paramCheck === "admin" || paramCheck === "manager") {
      next();
    }
  } catch (error) {
    res.json(error.message);
  }
};

const checkUserRole = (req, res, next) => {
  try {
    const userCheck = req.user.role;
    if (userCheck === "admin" || userCheck === "manager") {
      next();
    }
  } catch (error) {
    res.json(error.message);
  }
};

export { checkParamRole, checkUserRole };
