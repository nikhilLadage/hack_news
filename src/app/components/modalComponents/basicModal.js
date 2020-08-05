import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';

const BasicModalComponent = (props) =>{
    const {modalTitle, modalBody, modalFooter, toggleModal, setToggleModal} = props;
    const [show, setShow] = useState(false);
    const handleClose = () =>{
        setShow(false);
        setToggleModal(false);
    };
    useEffect(()=>{
        setShow(toggleModal);
    });
    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {modalTitle ? <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header> : '' }
            {modalBody ? <Modal.Body className="text-center pb-5 pt-5">{modalBody()}</Modal.Body> : ''}
            {modalFooter ? <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    {modalFooter}
                </Button>
            </Modal.Footer> : ''}
        </Modal>
    );    
}

export default BasicModalComponent;