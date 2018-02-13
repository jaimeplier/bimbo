import React, { Component } from 'react';
import ReactModal from 'simple-react-modal';

export default class Modal extends Component {
  render() {
    return (
      <ReactModal
        show={this.props.show}
        transitionSpeed={200}
        style={{ transition: 'opacity 0.2s ease-in', background: 'rgba(0, 0, 0, 0.5)' }}
        containerClassName="container"
        containerStyle={{ width: null, borderRadius: '2px' }}
        closeOnOuterClick
        onClose={this.props.onHide}
      >

        { this.props.children }
      </ReactModal>
    );
  }
}
