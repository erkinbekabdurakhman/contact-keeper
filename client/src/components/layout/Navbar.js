import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const NavBar = ({ title, icon }) => {
    return(
        <div className="navbar bg-primary">
            <h2>
                <i className={icon} /> 
                <Link to="/">{title}</Link>
            </h2>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
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