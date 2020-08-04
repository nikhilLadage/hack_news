import React from 'react';
import {Link, HashRouter as Router} from 'react-router-dom';

const NavigationComponent = (props)=>{
    const {children, url} = props;
    const linkStyle = {
        textDecoration: 'none',
        color: '#ffffff'
    };
    return (
        <Router>
            <Link to={url} style={linkStyle}>
                {children}
            </Link>
        </Router>
    );
};

export default NavigationComponent;
