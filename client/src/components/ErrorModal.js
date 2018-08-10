import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../actions';

import { ModalContainer, Modal } from './styles';

class ErrorModal extends Component {
    render() {
        if (this.props.errorMessage) {
            return (
                <ModalContainer onClick={ () => this.props.closeModal() }>
                    <Modal>
                        {this.props.errorMessage}
                    </Modal>
                </ModalContainer>
            );
        } return <Fragment />
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.error.message,
    }
}

export default connect(mapStateToProps, { closeModal })(ErrorModal);