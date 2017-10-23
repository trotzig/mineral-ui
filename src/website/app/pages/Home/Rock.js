import React, { Component } from 'react';
import { Parallax } from 'react-scroll-parallax';

type Props = {
  float?: boolean,
  offsetYMax?: number,
  position?: {
    bottom: number,
    left: number
  },
  size?: number,
  type?: 'ruby' | 'tourmaline' | 'gold' | 'rockpile'
};

type Context = {
  parallaxController?: {}
};

export default class Rock extends Component {
  props: Props;

  context: Context;

  static defaultProps = {
    type: 'Gold',
    size: 25,
    float: false
  };

  // TODO: Refactor inline styles to createStyledComponent
  render() {
    const {
      float,
      offsetYMax,
      position,
      size,
      type,
      ...restProps
    } = this.props;
    const imgSrc = `/images/rocks/${type}.svg`;

    if (float) {
      return (
        <div
          className="Rock"
          style={{
            position: 'absolute',
            bottom: float ? position.bottom : 0,
            left: position ? position.left : 0
          }}
          {...restProps}>
          <Parallax
            offsetYMax={offsetYMax}
            offsetYMin={0}
            offsetXMax={0}
            offsetXMin={0}
            disabed={!float}>
            <img
              alt={type}
              src={imgSrc}
              style={{
                width: size,
                height: 'auto'
              }}
            />
          </Parallax>
        </div>
      );
    } else {
      return (
        <img
          alt={type}
          src={imgSrc}
          style={{
            width: size,
            height: 'auto',
            position: 'absolute',
            bottom: float ? position.bottom : 0,
            left: position ? position.left : 0
          }}
        />
      );
    }
  }
}
