import React, {useState} from 'react';
import {Row, Col, Container, Badge, Card} from 'react-bootstrap';

const ListsComponent = (props)=>{
    const userActiveSessionId = JSON.parse(localStorage.getItem('userActiveSessionId'));
    const [voteVisibility, setVoteVisibility] = useState('');
    const [challengeListData, setChallengeList] = useState(() =>{
        const challengesListData = localStorage.getItem('Challenges');
        if(challengesListData && challengesListData !== ''){
            return JSON.parse(challengesListData);
        }else{
            return [];
        }
    });
    const getChallengesList = (event, sortType) =>{
        event.preventDefault();
        setChallengeList(() =>{
            const challengesListData = localStorage.getItem('Challenges');
            if(challengesListData && challengesListData !== ''){
                return JSON.parse(challengesListData).sort((firstElem, secElem)=>{
                    if(sortType === 'vote'){
                        if(firstElem.voterIds.length > secElem.voterIds.length){
                            return -1;
                        }else{
                            return 1;
                        }
                    }else{
                        if(firstElem.challengeId > secElem.challengeId){
                            return 1;
                        }else{
                            return -1;
                        }
                    }                    
                });
            }else{
                return [];
            }
        });
    };
    const setVote = (event, challengeId) =>{
        event.preventDefault();
        debugger;
        const challengeData = challengeListData.map((eachChallengeObj, index)=>{
            if(eachChallengeObj.challengeId === challengeId){
                if(!eachChallengeObj.voterIds.find((element)=>{return element === userActiveSessionId.userId})){
                    eachChallengeObj.voterIds.push(userActiveSessionId.userId);
                    setVoteVisibility(eachChallengeObj.challengeId);
                }                    
            }
            return eachChallengeObj;
        });
        localStorage.setItem('Challenges', JSON.stringify(challengeData));
    };
    return (
        <Container>
            <Container>
                <h3 className="mt-2">
                    Dashboard 
                </h3>
            </Container>
            <Row>
                <Col md={{ span: 4, offset: 8 }}>
                    Sort by : 
                    <span className="ml-2" onClick={(e)=>getChallengesList(e, 'vote')}>Votes</span> /
                    <span className="ml-2 text-primary" onClick={(e)=>getChallengesList(e, 'date')}>Date</span>
                </Col>
            </Row>
            <Row className="m-2">                
                <Col className="pl-0">
                    {challengeListData.length ? challengeListData.map((eachChallengeObj, index)=>(
                        <div key={index}>                            
                            <Card>
                                <Card.Body className="pb-2">
                                    <Card.Title>{eachChallengeObj.title}</Card.Title>
                                    <Card.Text className="mb-1">
                                        {eachChallengeObj.description}                                       
                                    </Card.Text>
                                    <p className="mb-1">
                                        <small>
                                            <b className="text-primary">Votes:</b> {eachChallengeObj.voterIds.length}
                                        </small>
                                    </p>
                                    <span className="float-left">
                                        Tags : <>
                                            {eachChallengeObj.tags ? Object.keys(eachChallengeObj.tags).map((eachTagObj, index)=>(
                                                <Badge pill variant="secondary" key={index} className="m-2 p-2">
                                                    {eachTagObj}
                                                </Badge>
                                            )) : ''}
                                        </> 
                                    </span>
                                    {eachChallengeObj.empId === userActiveSessionId.userId ? '' : <span className="float-right">
                                    {eachChallengeObj.voterIds.find((element)=>{return element === userActiveSessionId.userId}) ? <Badge pill variant="success" onClick={(e)=>setVote(e, eachChallengeObj.challengeId)} className="m-2 p-2 cursor">
                                             Voted <i className="ml-1 fa fa-check" aria-hidden="true"></i>
                                        </Badge>
                                        : (voteVisibility === eachChallengeObj.challengeId ? <Badge pill variant="success" onClick={(e)=>setVote(e, eachChallengeObj.challengeId)} className="m-2 p-2 cursor">
                                        Voted <i className="ml-1 fa fa-check" aria-hidden="true"></i>
                                   </Badge> : <Badge pill variant="secondary" onClick={(e)=>setVote(e, eachChallengeObj.challengeId)} className="m-2 p-2 cursor">
                                        Vote <i className="fa fa-thumbs-up ml-1 mr-1" aria-hidden="true"></i>
                                   </Badge>)}                            
                                    </span>}
                                </Card.Body>
                            </Card>                        
                        </div>
                    )) :  <Card>
                            <Card.Body className="pb-2">
                                <Card.Title>No new challenges are available to preview !</Card.Title>
                            </Card.Body>
                        </Card>}
                </Col>                
            </Row>
        </Container>
    );
};

export default ListsComponent;