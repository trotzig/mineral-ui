import React from 'react';
import { createStyledComponent } from '../../../../styles';
import { ThemeProvider } from '../../../../themes';
import Paragraph from '../../Paragraph';
import ColorRamp from './ColorRamp';
import Picker from './Picker';

type Props = {
  availableThemes: { [string]: string },
  changeTheme: () => {},
  style: Object,
  theme: Object
};

const styles = {
  description: ({ theme }) => ({
    [theme.bp_tablet]: {
      display: 'none'
    }
  }),
  root: ({ theme }) => ({
    backgroundColor: 'white',
    padding: `${theme.space_inset_md} ${theme.space_inset_md} 0`,
    zIndex: theme.zIndex_200
  }),
  themeSwatches: ({ theme }) => ({
    display: 'flex',
    '& div': {
      width: '50%',
      position: 'relative'
    },
    [theme.bp_tablet]: {
      display: 'none'
    }
  })
};

const Root = createStyledComponent('div', styles.root);
const Description = createStyledComponent(Paragraph, styles.description);
const ThemeSwatches = createStyledComponent('div', styles.themeSwatches);

const PRIMARY_REGEX = /^color_theme/;
const GRAY_REGEX = /^color_gray/;

// react-sticky breaks if this is a functional component
export default class Sidebar extends React.Component {
  props: Props;

  render() {
    const { changeTheme, style, theme, availableThemes } = this.props;

    const primaries = Object.entries(theme).reduce((accum, [key, value]) => {
      if (PRIMARY_REGEX.test(key)) {
        accum[key] = value;
      }
      return accum;
    }, {});
    const grays = Object.entries(theme).reduce((accum, [key, value]) => {
      if (GRAY_REGEX.test(key)) {
        accum[key] = value;
      }
      return accum;
    }, {});

    return (
      <Root style={style} key="sidebar">
        <ThemeProvider theme={theme}>
          <div>
            <Picker
              availableThemes={availableThemes}
              changeTheme={changeTheme}
            />
            <Description>
              A theme is composed of a hue color ramp and the base gray ramp.
              Every theme uses the base gray ramp.
            </Description>
            <ThemeSwatches>
              <ColorRamp ramp={primaries} />
              <ColorRamp ramp={grays} isGray={true} />
            </ThemeSwatches>
          </div>
        </ThemeProvider>
      </Root>
    );
  }
}
