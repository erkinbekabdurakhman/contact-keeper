import React, { useContext } from 'react';
import AuthContext from '../../Context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthentificated, loading } = authContext;

    return(
        <Route {...rest} render={props => !isAuthentificated && !loading ? (
            <Redirect to="/login" />
        ) : (
            <Component {...props} />
        )} />
    )
}

export default PrivateRoute;