import Layout from '../../components/layoutComponents';
import {connect} from 'react-redux';

const mapStateToProps = (state) =>{
    return {
        toggleMainLayoutProps : state.layout.toggleSidebar
    };
};

export default connect(mapStateToProps, null)(Layout.MainComponent);