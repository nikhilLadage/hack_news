import Layout from '../../components/layoutComponents';
import {connect} from 'react-redux';
import redModules from '../../../redux_modules';

const mapStateToProps = (state)=>{
    return {
        toggleSidebarProps: state.layout.toggleSidebar
    };
};

const mapDefaultToProps = (dispatch)=>({
    handleToggleSideBar: (data)=> dispatch({
        type: redModules.core.actions.layout.navBarActions.TOGGLE_SIDEBAR,
        payload : data
    })
});


export default connect(mapStateToProps, mapDefaultToProps)(Layout.NavBarComponent);