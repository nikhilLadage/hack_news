import Components from '../../components';
import {connect} from 'react-redux';
import redModules from '../../../redux_modules';

const mapStateToprops = (state) =>{
    return {
        modalTitle : state.modal.modalTitle, 
        modalBody : state.modal.modalBody, 
        modalFooter : state.modal.modalFooter, 
        toggleModal : state.modal.show
    };
}
const mapDispatchToProps = (dispatch) =>({
    setToggleModal: (data) =>dispatch({
        type: redModules.core.actions.modal.basicModalActions.TOGGLE_MODAL,
        payload: {show:data}
    })
})
export default connect(mapStateToprops, mapDispatchToProps)(Components.ModalComponents.BasicModalComponent);