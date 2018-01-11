import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as rest_client from '../rest_client';

class ServerDead extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //console.log(this.props.prepperValues.Selected_house);
        rest_client.getUserExists('0', (response) => {
            console.log(response);
        })
    }

    render() {
        return (
            <div>
                <h3>Server is Dead</h3>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerDead)