import React, {useState} from 'react';
import {Row, Col, Container, Form, Button, Alert, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const LoginScreenComponent = (props) =>{
    const {history} = props;
    const [userInfo, setUserInfoObj] = useState({
        'userId': '',
        'password': ''
    });
    const [errInfoObj, setErroInfoObj] = useState({});
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
        if(!validateData(userInfo)){
            const usersData = localStorage.getItem('Users');
            if(usersData && usersData !== ''){
                const userDataToJson = JSON.parse(usersData);
                const existsUserData = userDataToJson.filter((objectData)=>{
                    return objectData.userId === userInfo.userId && objectData.password === userInfo.password;
                });
                if(existsUserData.length){     
                    localStorage.setItem('userActiveSessionId', JSON.stringify({'userId': userInfo.userId}));               
                    history.push('/app');
                }
                setErroInfoObj({
                    'authError': ' Invalid credentials !'
                });
            }else{
                setErroInfoObj({
                    'authError': ' Invalid credentials !'
                });
            }
        }
    }
    const validateData = (data) => {
        var isValidationError = false;
        Object.keys(data).forEach((eachObj)=>{
            switch(eachObj){
                case 'userId' : if(!data[eachObj] || data[eachObj] === '' || data[eachObj] === null){
                                    Object.assign(errInfoObj, {[eachObj]: 'Employee id should not be empty.'});
                                    isValidationError = true;
                                }
                                return true;                            
                case 'password' : if(!data[eachObj] || data[eachObj] === '' || data[eachObj] === null){
                                    Object.assign(errInfoObj, {[eachObj]: 'Password should not be empty.'});
                                    isValidationError = true;
                                }else if(data[eachObj].length < 6 || data[eachObj].length > 8){
                                    Object.assign(errInfoObj, {[eachObj]: 'Password should not be less than 6 or greater than 8 characters.'});
                                    isValidationError = true;
                                }
                                return true;   
                default: return true;        
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
                                <Card.Title className="text-primary">Login</Card.Title>                            
                            </b>
                        </h3> 
                        {errInfoObj.authError && errInfoObj.authError !== '' ? <Alert variant='danger'>
                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i> {errInfoObj.authError}
                        </Alert> : ''}               
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control type="text" placeholder="Enter employee id" name="userId" onChange={(e)=>handleChange(e)} />                                
                                {errInfoObj.userId && errInfoObj.userId !== '' ? <Form.Text className="text-danger">
                                   {errInfoObj.userId}
                                </Form.Text> : <Form.Text className="text-muted">
                                We'll never share your employee id with anyone else.
                                </Form.Text>}
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)} />
                                {errInfoObj.password && errInfoObj.password !== '' ? <Form.Text className="text-danger">
                                   {errInfoObj.password}
                                </Form.Text> : ''}
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Text className="text-muted">
                                    <Link to="/register" >Not registered yet ?</Link>
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
    </>
    );
};

export default LoginScreenComponent;