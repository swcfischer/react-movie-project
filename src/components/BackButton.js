import React, { Component } from 'react';

export default class BackButton extends Component {
  static contextTypes = {
    router: () => null,
  }

  render() {
    return (
      <button
        className="button icon-left"
        onClick={this.context.router.history.goBack}
      >
          Back
      </button>
    );
  }
}
