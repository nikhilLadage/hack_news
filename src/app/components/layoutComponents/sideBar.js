import React, {useState, useEffect} from 'react';
import {HashRouter as Router} from 'react-router-dom';
import Components from '../../components';

const SideBarComponent = (props)=>{
    const {toggleSidebarProps} = props;
    const [sideBarProperty, setSideBarProperty] = useState('sideBar');
    const [brandlogoDesc, setBrandLogoDesc] = useState('Hackathons');
    const [sideBarItemsVisibility, setSideBarItemsVisibility] = useState(true);
    const anchorTagStyleObj = {
        'color': '#ffffff'
    };
    useEffect(()=>{
        if(toggleSidebarProps){
            setSideBarProperty('sideBarHide');
            setBrandLogoDesc('HT');
            setSideBarItemsVisibility(false);
        }else{
            setSideBarProperty('sideBar'); 
            setBrandLogoDesc('Hackathons');
            setSideBarItemsVisibility(true);
        }
    }, [toggleSidebarProps]);
    
    return (
    <div className={sideBarProperty}>
        <Router> 
                <div className="mt-4 ml-0 text-center">
                    <span>
                        {brandlogoDesc}
                    </span>
                </div>
                <Components.NavigationComponents.NavigationComponent url="/">          
                    <div className="mt-5 sideBarItems p-3">
                        <i className="fa fa-desktop" aria-hidden="true"></i>{sideBarItemsVisibility ? <span className="ml-3">Dashboard</span> : ''}
                    </div>
                </Components.NavigationComponents.NavigationComponent>
                <Components.NavigationComponents.NavigationComponent url="/challenge"> 
                    <div className="sideBarItems p-3">
                        <i className="fa fa-flag-checkered" aria-hidden="true"></i>{sideBarItemsVisibility ? <span className="ml-3">Challenge</span> : ''}
                    </div>
                </Components.NavigationComponents.NavigationComponent>
                <a href="/" style={anchorTagStyleObj}> 
                    <div className="sideBarItems p-3">
                        <i className="fa fa-power-off" aria-hidden="true"></i>{sideBarItemsVisibility ? <span className="ml-3">Sign out</span> : ''}
                    </div>
                </a>           
        </Router>
    </div>    
    );
};

export default SideBarComponent;