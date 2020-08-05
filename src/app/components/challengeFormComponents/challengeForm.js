import React, {useState} from 'react';
import {Row, Col, Container, Form, Button, Badge} from 'react-bootstrap';
import Containers from '../../containers';

const ChallengeFormComponent = (props)=>{
    const {setModalVisibilityData} = props;
    const badgeStyle = {
        cursor : 'pointer'
    };
    const [challengeInfo, setChallengeInfoObj] = useState({
        'title': '',
        'description': ''
    });    
    const [errInfoObj, setErroInfoObj] = useState({});
    const [tagsObj, setTagsObj] = useState({});
    const handleChange = (event) =>{
        var name = event.target.name;
        var value = event.target.value;
        Object.assign(challengeInfo, {
            [name] : value
        });
        setChallengeInfoObj({...challengeInfo});
        if(value !== '' || value !== null){
            Object.assign(errInfoObj, {
                [name] : '',
                'authError': ''
            });
            setErroInfoObj({...errInfoObj}); 
        }        
    };
    const submitChallengeInfo = (event) => {
        event.preventDefault();        
        if(!validateData(challengeInfo)){
            const challengesData = localStorage.getItem('Challenges');
            const userActiveSessionId = JSON.parse(localStorage.getItem('userActiveSessionId'));
            if(challengesData && challengesData !== ''){
                const challengesDataToJson = JSON.parse(challengesData);                        
                challengesDataToJson.push({
                    'challengeId': challengesDataToJson.length + 1,
                    'title': challengeInfo.title,
                    'description': challengeInfo.description,
                    'creationAt': new Date(),
                    'empId': userActiveSessionId.userId,
                    'voterIds': [],
                    'tags': tagsObj
                });
                localStorage.setItem('Challenges', JSON.stringify(challengesDataToJson));
                Object.assign(challengeInfo, {});
                setChallengeInfoObj({...challengeInfo});
                setTagsObj({});
                setModalVisibilityData({
                    show: true,
                    modalTitle: '',
                    modalBody: () => (
                        <div>
                            <h3 className="text-success">Challenge Added Successfully</h3>
                            <p>Now you can be able to see your challenges on dashboard.</p>   
                        </div>                                 
                    ),
                    modalFooter: 'Close'
                });
            }else{
                    localStorage.setItem('Challenges', JSON.stringify([{
                        'challengeId': 1,
                        'title': challengeInfo.title,
                        'description': challengeInfo.description,
                        'creationAt': new Date(),
                        'empId': userActiveSessionId.userId,
                        'voterIds': [],
                        'tags': tagsObj
                    }]));
                    Object.assign(challengeInfo, {});
                    setChallengeInfoObj({...challengeInfo});
                    setTagsObj({});
                    setModalVisibilityData({
                        show: true,
                        modalTitle: '',
                        modalBody: () => (
                            <div>
                                <h3 className="text-success">Challenge Added Successfully</h3>
                                <p>Now you can be able to see your challenges on dashboard.</p>
                            </div>                                
                        ),
                        modalFooter: 'Close'
                    });
            } 
        }
    }
    const validateData = (data) => {
        var isValidationError = false;
        Object.keys(data).forEach((eachObj)=>{
            switch(eachObj){
                case 'title' : if(!data[eachObj] || data[eachObj] === '' || data[eachObj] === null){
                                    Object.assign(errInfoObj, {[eachObj]: 'Title should not be empty.'});
                                    isValidationError = true;
                                }
                                return true;                            
                case 'description' : if(!data[eachObj] || data[eachObj] === '' || data[eachObj] === null){
                                    Object.assign(errInfoObj, {[eachObj]: 'Description should not be empty.'});
                                    isValidationError = true;
                                }
                                return true; 
                default:  return true;          
            }
        }); 
        setErroInfoObj({...errInfoObj}); 
        return isValidationError;      
    };
    const setTagForChallenge = (event, tagsName) =>{
        Object.assign(tagsObj, {[tagsName]: tagsObj[tagsName] ? false : true});
        setTagsObj({
            ...tagsObj
        })
    }
    return (
        <Container>
            <Row>
               <Col>
                    <Form>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="title" onChange={(e)=>handleChange(e)} />
                            {errInfoObj.title && errInfoObj.title !== '' ? <Form.Text className="text-danger">
                                   {errInfoObj.title}
                                </Form.Text> : ''}
                        </Form.Group>

                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" name="description" onChange={(e)=>handleChange(e)} />
                            {errInfoObj.description && errInfoObj.description !== '' ? <Form.Text className="text-danger">
                                   {errInfoObj.description}
                                </Form.Text> : ''}
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Select tags</Form.Label>
                            <Badge pill variant={tagsObj.trending ? "success" : "secondary"} style={badgeStyle} className="m-2 p-2" onClick={(e)=>setTagForChallenge(e, 'trending')}>
                                trending {tagsObj.trending ? <i className="fa fa-check" aria-hidden="true"></i>: ''}
                            </Badge>
                            <Badge pill variant={tagsObj.superb ? "success" : "secondary"} style={badgeStyle} className="m-2 p-2" onClick={(e)=>setTagForChallenge(e, 'superb')}>
                                superb {tagsObj.superb ? <i className="fa fa-check" aria-hidden="true"></i>: ''}
                            </Badge>
                            <Badge pill variant={tagsObj.covid ? "success" : "secondary"} style={badgeStyle} className="m-2 p-2" onClick={(e)=>setTagForChallenge(e, 'covid')}>
                                covid-19 {tagsObj.covid ? <i className="fa fa-check" aria-hidden="true"></i>: ''}
                            </Badge>
                            <Badge pill variant={tagsObj.hacker ? "success" : "secondary"} style={badgeStyle} className="m-2 p-2" onClick={(e)=>setTagForChallenge(e, 'hacker')}>
                                hacker {tagsObj.hacker ? <i className="fa fa-check" aria-hidden="true"></i>: ''}
                            </Badge>
                            <Badge pill variant={tagsObj.troll ? "success" : "secondary"} style={badgeStyle} className="m-2 p-2" onClick={(e)=>setTagForChallenge(e, 'troll')}>
                                troll {tagsObj.troll ? <i className="fa fa-check" aria-hidden="true"></i>: ''}
                            </Badge>
                            <Badge pill variant={tagsObj.rafel ? "success" : "secondary"} style={badgeStyle} className="m-2 p-2" onClick={(e)=>setTagForChallenge(e, 'rafel')}>
                                rafel {tagsObj.rafel ? <i className="fa fa-check" aria-hidden="true"></i>: ''}
                            </Badge>
                        </Form.Group>                        
                        <Button variant="primary" onClick={(e)=>submitChallengeInfo(e)}>
                            Submit
                        </Button>
                    </Form>
               </Col> 
            </Row>
            <Containers.ModalScreenContainers.ModalContainerComponent />
        </Container>
    );
};

export default ChallengeFormComponent;