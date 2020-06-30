import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ exact, path, children }) {
  const user = useSelector(store=>store.user)

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
