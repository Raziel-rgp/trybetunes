import React, { Component } from 'react';

export default class RemoveLoading extends Component {
  removeLoading = () => {
    const cr = document.querySelector('.loading');
    cr.remove();
  };

  render() {
    return (
      <div>RemoveLoading</div>
    );
  }
}
