import React from 'react';
import Containers from '../../containers';
import {Container} from 'react-bootstrap';

const DashboardHomeComponent = (props) =>{
    return (
        <div>
            <Container>
                <h3 className="mt-2">
                    Dashboard 
                </h3>
            </Container>
            <Containers.DashboardContainers.ChallengeListsContainerComponent />
        </div>
    );
};

export default DashboardHomeComponent;