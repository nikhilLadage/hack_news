import React, {useEffect, useState} from 'react';

const MainComponent = (props) =>{
    const {children} = props;
    const {toggleMainLayoutProps} = props;
    const [mainLayoutProperty, setMainLayoutProperty] = useState('wrapper');
    useEffect(()=>{
        if(toggleMainLayoutProps){
            setMainLayoutProperty('wrapperGrow');
        }else{
            setMainLayoutProperty('wrapper'); 
        }
    },[toggleMainLayoutProps]);
    return (
        <div className={mainLayoutProperty}>
            {children}
        </div>
    );  
}

export default MainComponent;