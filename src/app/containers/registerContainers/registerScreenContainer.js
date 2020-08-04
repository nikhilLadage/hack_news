import Screens from '../../screens';
import {connect} from 'react-redux';
import redModules from '../../../redux_modules';

const mapDispatchToProps = (dispatch) => ({
    setModalVisibilityData: (data)=> dispatch({
        type: redModules.core.actions.modal.basicModalActions.TOGGLE_MODAL,
        payload: data
    })
});

export default connect(null, mapDispatchToProps)(Screens.RegisterScreenComponent.RegisterScreenComponent);