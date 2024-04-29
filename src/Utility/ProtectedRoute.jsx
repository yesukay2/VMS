import React from "react";
import { Route, useNavigate } from "react-router-dom";
import Proptypes from "prop-types";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : navigate("/")
      }
    />
  );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  component: Proptypes.elementType.isRequired,
  isAuthenticated: Proptypes.bool.isRequired,
};
