import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const NavBarComponent = (props) =>{
    const {handleToggleSideBar, toggleSidebarProps} = props;
    const handleToggleSideBarFunc = (e) =>{
        handleToggleSideBar(toggleSidebarProps);
    }
    return (             
        <Container fluid className='rootNav navBar'>
            <Row>
                <Col className='p-2'>
                    <span data-testid="toggle-bar-icon" variant='primary' onClick={(e)=>handleToggleSideBarFunc(e)}><i className="fa fa-bars cursor" aria-hidden="true"></i></span>
                </Col>
            </Row>
        </Container>
    );
};

export default NavBarComponent;
