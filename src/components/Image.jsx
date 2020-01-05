import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errored: false
    };
  }

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        errored: true
      });
    }
  };

  render() {
    if (this.state.errored) {
      return <FallbackImage>BROKEN IMAGE</FallbackImage>;
    } else {
      return <ImageTag src={this.props.src} onError={this.onError} />;
    }
  }
}

Image.propTypes = {
  src: PropTypes.string,
  fallbackSrc: PropTypes.string
};

const ImageTag = styled.img`
  border-radius: 3px;
  box-shadow: 0 0 5px black;
`;

const FallbackImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 154px;
  height: 231px;
  background: #333;
  border-radius: 3px;
  box-shadow: 0 0 5px black;
  color: #fff;
  font-style: italic;
`;
