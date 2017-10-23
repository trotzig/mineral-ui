import React from 'react';
import Rock from './Rock';
import { ParallaxProvider } from 'react-scroll-parallax';

type Props = {
  showRockPile?: boolean
};

export default class Rocks extends React.Component {
  props: Props;

  // TODO: Refactor inline styles to createStyledComponent
  render() {
    const { showRockPile, ...restProps } = this.props;
    return (
      <ParallaxProvider>
        <div
          className="Rocks"
          style={{
            position: 'relative'
          }}
          {...restProps}>
          {showRockPile && <Rock type="rockpile" size={300} />}
          <Rock
            offsetYMax={showRockPile ? 420 : 270}
            type="ruby"
            size={75}
            float
            position={{ left: 25, bottom: showRockPile ? 360 : 150 }}
          />
          <Rock
            offsetYMax={showRockPile ? 360 : 100}
            type="gold"
            size={75}
            float
            position={{ left: 105, bottom: showRockPile ? 330 : 50 }}
          />
          <Rock
            offsetYMax={showRockPile ? 500 : 130}
            type="tourmaline"
            size={75}
            float
            position={{ left: 190, bottom: showRockPile ? 400 : 110 }}
          />
        </div>
      </ParallaxProvider>
    );
  }
}
