import React, {useState} from 'react';
import {Row, Col, Container, Form, Button, Card, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Containers from '../../containers';

const RegisterScreenComponent = (props) => {
    const {history, setModalVisibilityData} = props;
    const [userInfo, setUserInfoObj] = useState({
        'userId': localStorage.getItem('UserId') ? 'EMP'+(parseInt(localStorage.getItem('UserId'))+1) : 'EMP'+ 0,
        'password': '',
        'confirmPassword': ''
    });
    const [errInfoObj, setErroInfoObj] = useState({});

    const handleRoute = () =>{
        history.push('/app');
    };

    const handleChange = (event) =>{
        var name = event.target.name;
        var value = event.target.value;
        Object.assign(userInfo, {
            [name] : value
        });
        setUserInfoObj({...userInfo});
        if(value !== '' || value !== null){
            Object.assign(errInfoObj, {
                [name] : '',
                'authError': ''
            });
            setErroInfoObj({...errInfoObj}); 
        }        
    };
    const submitUserInfo = (event) => {
        event.preventDefault();
        const usersData = localStorage.getItem('Users');
        if(usersData && usersData !== ''){
            const userDataToJson = JSON.parse(usersData);
            const existsUserData = userDataToJson.filter((objectData)=>{
                return objectData.userId === userInfo.userId;
            });
            if(existsUserData.length){
                setErroInfoObj({
                    'authError': ' User Already exists !'
                });
            }else{
                if(!validateData(userInfo)){
                    const modifyUserId = localStorage.getItem('UserId') ? parseInt(localStorage.getItem('UserId'))+1 : 0;
                    userDataToJson.push({
                        'userId': 'EMP'+ modifyUserId,
                        'password': userInfo.password
                    });
                    localStorage.setItem('Users', JSON.stringify(userDataToJson));
                    localStorage.setItem('UserId', JSON.stringify(modifyUserId));
                    localStorage.setItem('userActiveSessionId', JSON.stringify({'userId': 'EMP'+ modifyUserId}));                      
                    //history.push('/app');
                    setModalVisibilityData({
                        show: true,
                        modalTitle: '',
                        modalBody: () => (
                            <div>
                                <h3 className="text-success">Registration Successful</h3>
                                <p>Now you can able to add/view new challenges. Click on proceed button to continue.</p>
                                <Button variant="primary" onClick={handleRoute}>
                                    Proceed
                                </Button>
                            </div>                                
                        ),
                        modalFooter: ''
                    });

                }
            }
        }else{
            if(!validateData(userInfo)){
                localStorage.setItem('Users', JSON.stringify([{
                    'userId':  userInfo.userId,
                    'password': userInfo.password
                }]));
                localStorage.setItem('UserId', '0');
                localStorage.setItem('userActiveSessionId', JSON.stringify({'userId':  userInfo.userId})); 
                //history.push('/app');
                setModalVisibilityData({
                    show: true,
                    modalTitle: '',
                    modalBody: () => (
                        <div>
                            <h3 className="text-success">Thank you for register !</h3>
                            <p>Now you can able to add/view new challenges. Click on proceed button to continue.</p>
                            <Button variant="primary" onClick={handleRoute}>
                                Proceed
                            </Button>
                        </div>                                
                    ),
                    modalFooter: ''
                });
            }
        }        
    };
    const validateData = (data) => {
        var isValidationError = false;
        Object.keys(data).forEach((eachObj)=>{
            switch(eachObj){                           
                case 'password' : if(!data[eachObj] || data[eachObj] === '' || data[eachObj] === null){
                                    Object.assign(errInfoObj, {[eachObj]: 'Password should not be empty.'});
                                    isValidationError = true;
                                }else if(data[eachObj].length < 6 || data[eachObj].length > 8){
                                    Object.assign(errInfoObj, {[eachObj]: 'Password should not be less than 6 or greater than 8 characters.'});
                                    isValidationError = true;
                                }
                                return true;
                case 'confirmPassword' : if(!data[eachObj] || data[eachObj] === '' || data[eachObj] === null){
                                    Object.assign(errInfoObj, {[eachObj]: 'New password should not be empty.'});
                                    isValidationError = true;
                                }else if(data[eachObj].length < 6 || data[eachObj].length > 8){
                                    Object.assign(errInfoObj, {[eachObj]: 'New password should not be less than 6 or greater than 8 characters.'});
                                    isValidationError = true;
                                }else if(data[eachObj] !== data['password']){
                                    Object.assign(errInfoObj, {[eachObj]: 'New password is not same as original password.'});
                                    isValidationError = true;
                                }
                                return true; 
                default:    return true;           
            }
        }); 
        setErroInfoObj({...errInfoObj}); 
        return isValidationError;      
    };
    return (
        <>
        <Container>
            <div className="text-center mt-4">
                    <h3>
                        HackaThons
                    </h3>
            </div>
        </Container>
        <Row className="justify-content-md-center m-2 mt-5">                            
            <Col md={{ span: 5, offset: 0 }}>
                <Card>
                    <Card.Body className="pb-2">
                        <h3>
                            <b>
                                <Card.Title className="text-primary">Register</Card.Title>                            
                            </b>
                        </h3>
                        {errInfoObj.authError && errInfoObj.authError !== '' ? <Alert variant='danger'>
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {errInfoObj.authError}
                        </Alert> : ''}                      
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control type="text" placeholder="Enter employee id" name="userId" onChange={(e)=>handleChange(e)} value={userInfo.userId} disabled={true}/>
                                <Form.Text className="text-muted">
                                   Please remember this employee id to login this app. 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Create New Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
                                {errInfoObj.password && errInfoObj.password !== '' ? <Form.Text className="text-danger">
                                   {errInfoObj.password}
                                </Form.Text> : ''}
                            </Form.Group>
                            <Form.Group controlId="formBasicNewPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="confirmPassword" onChange={(e)=>handleChange(e)} />
                                {errInfoObj.confirmPassword && errInfoObj.confirmPassword !== '' ? <Form.Text className="text-danger">
                                   {errInfoObj.confirmPassword}
                                </Form.Text> : ''}
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Text className="text-muted">
                                    <Link to="/" >Already login ?</Link>
                                </Form.Text>
                            </Form.Group>
                            <span className="text-center">
                                <Button variant="primary" className="float-right" onClick={(e)=>submitUserInfo(e)}>
                                    Proceed
                                </Button>
                            </span>                            
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Containers.ModalScreenContainers.ModalContainerComponent />
    </>
    );
};

export default RegisterScreenComponent;