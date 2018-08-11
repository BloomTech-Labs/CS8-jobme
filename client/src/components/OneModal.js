import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../actions';

import { ModalContainer, Modal } from './styles';

class OneModal extends Component {
    render() {
        if (this.props.modalMessage) {
            return (
                <ModalContainer onClick={ () => this.props.closeModal() }>
                    <Modal>
                        {this.props.modalMessage}
                    </Modal>
                </ModalContainer>
            );
        } return <Fragment />
    }
}

const mapStateToProps = state => {
    return {
        modalMessage: state.modal.modalMessage,
    }
}

export default connect(mapStateToProps, { closeModal })(OneModal);