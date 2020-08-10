import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../Context/auth/authContext';
import ContactContext from '../../Context/contact/contactContext';

const NavBar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthentificated, logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout = () =>{
        logout();
        clearContacts();
    }
    const AuthLink = (
        <>
        <li>@ {user && user.name}</li>
        <li>
            <a href="#!" onClick={onLogout}>
                <i className="fa fa-sign-out-alt"></i>
                <span className="hide-sm">Log Out</span>
            </a>
        </li>
        </>
    )
    const guestLink = (
        <>
        <li>
            <Link to="/register">Register</Link>
        </li>
        <li>
            <Link to="/login">Login</Link>
        </li>
        </>
    )
    return(
        <div className="navbar bg-primary">
            <h2>
                <i className={icon} /> 
                <Link to="/">{title}</Link>
            </h2>
            <ul>
                { isAuthentificated ? AuthLink : guestLink }
            </ul>
        </div>
    )
        
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

NavBar.defaultProps = {
    title: "Contact Keeper",
    icon: 'fa fa-id-card'
}

export default NavBar