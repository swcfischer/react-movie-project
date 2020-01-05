import React, { Component } from 'react';
import styled from 'styled-components';

export default class BackButton extends Component {
  static contextTypes = {
    router: () => null
  };

  render() {
    return <Button onClick={this.context.router.history.goBack}>Back</Button>;
  }
}

const Button = styled.button`
  align-self: flex-start;
  background: #000;
  color: #fff;
  border: #999;
  font-size: 16px;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  font-style: italic;
  cursor: pointer;
  letter-spacing: 1px;
  box-shadow: 0 0 1px black;
`;
