import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { createTheme, mineralTheme } from '../../../../themes';
import Heading from '../../Heading';

import GuidelinePage from '../../GuidelinePage';
import { createStyledComponent } from '../../../../styles';
import Sidebar from './Sidebar';
import Demo from './Demo';

type Props = {
  pageMeta: {
    title: string,
    canonicalLink: string
  }
};

const duration = 350;
const breakpoints = {
  bp_mobile: '@media(max-width: 45em)',
  bp_tablet: '@media(max-width: 70em)'
};
const availableThemes = {
  purple: 'white',
  indigo: 'white',
  blue: 'white',
  sky: mineralTheme.color_black,
  teal: mineralTheme.color_black,
  lime: mineralTheme.color_black,
  slate: mineralTheme.color_black,
  dusk: 'white'
};

const styles = {
  leftColumn: ({ theme }) => ({
    marginRight: theme.space_inline_md,
    [breakpoints.bp_mobile]: {
      marginRight: 0
    }
  }),
  rightColumn: {
    width: '20em',
    minWidth: '20em',
    [breakpoints.bp_tablet]: {
      display: 'none'
    }
  },
  lede: ({ theme }) => ({
    fontSize: theme.fontSize_h3,
    marginBottom: theme.space_stack_xxl
  }),
  mobileSticky: ({ theme }) => ({
    display: 'none',
    position: 'relative',
    top: '-50px',
    left: `-${theme.space_inline_md}`,
    width: `calc(100% + ${theme.space_inline_xl})`,
    [breakpoints.bp_tablet]: {
      display: 'block'
    }
  }),
  paragraph: ({ theme }) => ({
    margin: `${theme.space_stack_xxl} 0 !important`
  }),
  root: {
    display: 'flex',
    position: 'relative'
  }
};

const Root = createStyledComponent(StickyContainer, styles.root);
const Lede = createStyledComponent('p', styles.lede);
const MobileSticky = createStyledComponent('div', styles.mobileSticky);
const LeftColumn = createStyledComponent(GuidelinePage, styles.leftColumn);
const RightColumn = createStyledComponent('div', styles.rightColumn);

const mineralColor = 'blue';
const defaultTheme = createTheme(mineralColor, {
  ...breakpoints,
  color_text_onprimary: availableThemes[mineralColor]
});

export default class PaletteDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: defaultTheme, oldTheme: defaultTheme };
  }

  props: Props;

  handleThemeChange = color => {
    const newTheme = createTheme(color, {
      ...breakpoints,
      color_text_onprimary: availableThemes[color]
    });
    this.setState(prevState => {
      return { oldTheme: { ...prevState.theme }, theme: newTheme };
    });
    setTimeout(() => {
      this.setState({ oldTheme: newTheme });
    }, duration * 2);
  };

  render() {
    const { oldTheme, theme } = this.state;

    return (
      <Root>
        <LeftColumn {...this.props}>
          <Heading level={1}>Palette Picker</Heading>
          <Lede>
            Mineral UI themes are composed of a main color ramp and the base
            gray ramp. Every theme uses the base gray ramp. Select from the main
            theme colors in the picker to see how components are affected.
          </Lede>
          <MobileSticky>
            <Sticky topOffset={300}>
              {({ style }) => {
                return (
                  <Sidebar
                    availableThemes={availableThemes}
                    style={style}
                    theme={theme}
                    changeTheme={this.handleThemeChange}
                  />
                );
              }}
            </Sticky>
          </MobileSticky>
          <Demo oldTheme={oldTheme} newTheme={theme} />
        </LeftColumn>
        <RightColumn>
          <Sticky>
            {({ style }) => {
              return (
                <Sidebar
                  availableThemes={availableThemes}
                  style={style}
                  theme={theme}
                  changeTheme={this.handleThemeChange}
                />
              );
            }}
          </Sticky>
        </RightColumn>
      </Root>
    );
  }
}
