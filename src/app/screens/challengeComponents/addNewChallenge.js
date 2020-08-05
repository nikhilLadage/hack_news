import React from 'react';
import Containers from '../../containers';
import {Container} from 'react-bootstrap';

const AddNewChallengeComponent = (props) =>{
    return (
        <div>            
            <Container className="p-2">
                <h3>
                    Add New Challenge
                </h3>
            </Container>
            <Containers.ChallengeContainers.ChallengeFormContainerComponent />
        </div>
    );
};

export default AddNewChallengeComponent;