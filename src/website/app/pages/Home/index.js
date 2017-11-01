/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React, { Component } from 'react';
import Media from 'react-media';
import desaturate from 'polished/lib/color/desaturate';
import rgba from 'polished/lib/color/rgba';
import colors from '../../../../colors';
import {
  createStyledComponent,
  getNormalizedValue,
  pxToEm
} from '../../../../styles';
import {
  createTheme,
  createThemedComponent,
  mineralTheme,
  ThemeProvider
} from '../../../../themes';
import _Button from '../../../../Button';
import IconChevronRight from '../../../../Icon/IconChevronRight';
import IconFavorite from '../../../../Icon/IconFavorite';
import Canvas from '../../Canvas';
import Footer from '../../Footer';
import Logo from '../../Logo';
import Section from '../../Section';
import Link from '../../SiteLink';
import _Markdown from '../../Markdown';
import siteColors from '../../siteColors';
import Header from './Header';
import Rocks from './Rocks';
import ThemePlayground from './ThemePlayground';
import accessibility from './content/accessibility.md';
import dropInComponents from './content/dropInComponents.md';
import getStarted from './content/getStarted.md';
import guidelines from './content/guidelines.md';
import intro from './content/intro.md';
import themePlayground from './content/themePlayground.md';

type Props = {};

type State = {
  themeIndex: number
};

const latestPost = {
  title: 'How we built our site using our components',
  url: 'https://medium.com'
};

const playgroundThemes = [
  {
    name: 'Magenta',
    ...createTheme('magenta'),
    color_text: siteColors.slate
  },
  { name: 'Teal', ...createTheme('teal'), color_text: siteColors.slate },
  { name: 'Sky', ...createTheme('sky'), color_text: siteColors.slate }
];

export const heroTheme = {
  color_text: colors.white,

  Button_backgroundColor_primary: siteColors.orange,
  Button_backgroundColor_primary_active: siteColors.orange_active,
  Button_backgroundColor_primary_focus: siteColors.orange_focus,
  Button_backgroundColor_primary_hover: siteColors.orange_hover,
  Button_color_text: siteColors.slate_active,

  Heading_color_2: colors.white,

  Link_color: colors.white,
  Link_color_active: colors.gray_10,
  Link_color_focus: colors.white,
  Link_color_hover: colors.white
};
const gettingStartedTheme = {
  color_text: colors.white,

  Button_backgroundColor_primary: siteColors.yellow,
  Button_backgroundColor_primary_active: siteColors.yellow_active,
  Button_backgroundColor_primary_focus: siteColors.yellow_focus,
  Button_backgroundColor_primary_hover: siteColors.yellow_hover,

  Button_color_text: colors.gray_100,
  Button_color_text_primary: colors.gray_100,

  Heading_color_3: colors.white,
  Heading_color_4: colors.white,

  Link_color: siteColors.yellow,
  Link_color_active: siteColors.yellow_active,
  Link_color_focus: siteColors.yellow_focus,
  Link_color_hover: siteColors.yellow_hover
};
const buttonTheme = {
  Button_fontWeight: mineralTheme.fontWeight_regular,
  Button_height_jumbo: pxToEm(39),
  Button_paddingHorizontal: pxToEm(16), // For a total of 32
  ButtonContent_fontSize: pxToEm(19)
};
const CTALinkTheme = {
  Link_borderColor_focus: siteColors.orange_focus,
  Link_color: siteColors.orange,
  Link_color_active: siteColors.orange_active,
  Link_color_hover: siteColors.orange_hover,
  Link_color_focus: siteColors.orange_focus
};

const styles = {
  blogLink: ({ theme }) => ({
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: theme.borderRadius_1,
    display: 'inline-flex',
    fontFamily: theme.fontFamily_headline,
    marginBottom: theme.baseline_6,
    padding: `${parseFloat(theme.space_inset_sm) / 2}em
      ${theme.space_inset_sm}`,

    '&:hover,&:focus': {
      backgroundColor: 'rgba(0,0,0,0.2)',
      textDecoration: 'none'
    },

    '&::before': {
      backgroundColor: siteColors.orange_active,
      borderRadius: theme.borderRadius_1,
      content: 'New',
      fontSize: '0.8em',
      fontWeight: theme.fontWeight_bold,
      marginRight: theme.space_inline_sm,
      padding: `
      ${parseFloat(theme.space_inset_sm) / 4}em
      ${parseFloat(theme.space_inset_sm) / 2}em
      `,
      textTransform: 'uppercase'
    },

    '& > svg': {
      flex: '0 0 auto'
    }
  }),
  button: ({ theme }) => ({
    fontFamily: theme.fontFamily_headline
  }),
  buttons: ({ theme }) => ({
    marginTop: theme.baseline_3,

    '& > * + *': {
      marginLeft: theme.space_inline_lg
    }
  }),
  CTALink: ({ theme }) => ({
    alignItems: 'center',
    display: 'inline-flex',
    fontFamily: theme.fontFamily_headline,
    fontWeight: theme.fontWeight_semiBold,

    '& > svg': {
      flex: '0 0 auto'
    }
  }),
  feature: ({ theme }) => ({
    textAlign: 'center',

    '& + &': {
      marginTop: theme.baseline_6
    },

    [theme.bp_home_navExpanded]: {
      flex: `0 0 ${5 / 12 * 100}%`,
      textAlign: 'left',

      '& + &': {
        marginTop: 0
      }
    }
  }),
  featureImg: ({ circleFill, theme }) => ({
    backgroundColor: circleFill,
    borderRadius: theme.baseline_5,
    height: theme.baseline_5,
    marginBottom: `${parseFloat(theme.baseline_1) - 0.3}em`, // Optical adjustment
    padding: theme.baseline_1,
    width: theme.baseline_5
  }),
  featureSection: ({ theme }) => ({
    // Inner
    '& > div': {
      [theme.bp_home_navExpanded]: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }
  }),
  floatingRocks: ({ theme }) => ({
    height: 150,
    margin: `0 auto ${theme.baseline_3}`,
    width: 300,

    [theme.bp_home_guidelinesMultiColumn]: {
      height: 300,
      flex: `0 0 300px`,
      order: 2,
      margin: 0
    }
  }),
  getStarted: ({ theme }) => ({
    // Specificity hack
    '& > h3[id]': {
      margin: `0 0 ${getNormalizedValue(
        theme.baseline_6,
        theme.SiteHeading_fontSize_3_wide
      )}`,
      textAlign: 'center',

      [theme.bp_home_smallH3AndDown]: {
        margin: `0 0 ${getNormalizedValue(
          theme.baseline_6,
          theme.SiteHeading_fontSize_3
        )}`
      }
    },

    '& > ol': {
      counterReset: 'getStarted',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },

    '& li': {
      counterIncrement: 'getStarted',
      paddingTop: `${2.5 + parseFloat(theme.baseline_1)}em`,
      position: 'relative',

      [theme.bp_home_getStartedLeftAlign]: {
        paddingTop: 0
      },

      '& + li': {
        marginTop: theme.baseline_6
      },

      '&::before': {
        backgroundColor: siteColors.yellow,
        borderRadius: '0.75em',
        content: 'counter(getStarted)',
        color: theme.color_gray_100,
        fontSize: '1.5em',
        fontWeight: theme.fontWeight_extraBold,
        height: '1.5em',
        left: '50%',
        position: 'absolute',
        textAlign: 'center',
        top: 0,
        transform: 'translateX(-50%)',
        width: '1.5em',

        [theme.bp_home_getStartedLeftAlign]: {
          fontSize: '1em',
          height: '1.5em',
          left: 'auto',
          right: `calc(100% + ${theme.space_inline_md})`,
          top: '0.05em', // Optical adjustment
          transform: 'none',
          width: '1.5em'
        }
      },

      '& > h4': {
        lineHeight: theme.lineHeight_prose,
        fontWeight: theme.SiteHeading_fontWeight_4,
        margin: `0 0 ${getNormalizedValue(theme.baseline_2, theme.fontSize_h4)}`
      }
    },

    '& :not(pre) > code': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      color: theme.color_text
    },

    // Specificity hack
    '& pre[class]': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      maxHeight: 'none'
    }
  }),
  getStartedBackgrounds: ({ theme }) => ({
    '& > :nth-child(1)': {
      '& > svg': {
        mixBlendMode: 'luminosity',
        transform: 'translateX(50%) rotate(180deg) scale(2)'
      }
    },

    '& > :nth-child(2)': {
      background: `repeating-linear-gradient(
        -45deg,
        rgba(255,255,255,0.025),
        rgba(255,255,255,0.025) 1px,
        rgba(0,0,0,0) 1px,
        rgba(0,0,0,0) 6px
      ), linear-gradient(
        rgba(0,0,0,0.4),
        ${theme.color_gray_100} 75%
      )`
    }
  }),
  getStartedContent: ({ theme }) => ({
    margin: '0 auto',
    maxWidth: 'min-content',
    textAlign: 'center',

    [theme.bp_home_getStartedLeftAlign]: {
      textAlign: 'left'
    },

    // Logo
    '& > svg': {
      display: 'block',
      margin: `0 auto ${theme.baseline_2}`,
      width: '52px'
    }
  }),
  getStartedSection: ({ theme }) => ({
    position: 'relative',

    // Inner
    '& > div': {
      [theme.bp_moreSpacious]: {
        paddingTop: theme.baseline_7 // Optical adjustment
      }
    }
  }),
  guidelines: ({ theme }) => ({
    textAlign: 'center',

    [theme.bp_home_guidelinesMultiColumn]: {
      flex: `1 1 auto`,
      marginLeft: `${1 / 12 * 100}%`,
      marginRight: `${1 / 12 * 100}%`,
      order: 1,
      textAlign: 'right'
    },

    // Dependent on h2 & p content
    '& > p': {
      '@media(min-width: 66.5em)': {
        marginLeft: '3em'
      },

      '@media(min-width: 69.5em)': {
        marginLeft: '4.5em'
      },

      '@media(min-width: 74em)': {
        marginLeft: '6em'
      },

      '@media(min-width: 76em)': {
        marginLeft: '6.5em'
      }
    }
  }),
  guidelinesSection: ({ theme }) => ({
    // Inner
    '& > div': {
      [theme.bp_home_guidelinesMultiColumn]: {
        alignItems: 'center',
        display: 'flex'
      }
    },

    // Guidelines
    '& > div > :last-child': {
      [theme.bp_home_betweenMoreSpaciousAndGuidelinesMultiColumn]: {
        margin: `0 ${1 / 12 * 100}%`
      }
    }
  }),
  hero: ({ theme }) => ({
    // Inner
    '> div': {
      paddingTop: 0,

      [theme.bp_home_navExpanded]: {
        justifyContent: 'space-between'
      }
    }
  }),
  heroCanvas: ({ theme }) => ({
    backgroundColor: siteColors.slate,

    [theme.bp_home_navCollapsedAndDown]: {
      bottom: '-14.5em' // Matches change in Header margin due to open menu
    }
  }),
  intro: ({ theme }) => ({
    // All of these numbers are dependent on width of h2 content
    '& h2': {
      fontSize: theme.SiteHeading_fontSize_2,
      margin: `0 0 ${getNormalizedValue(
        theme.baseline_2,
        theme.SiteHeading_fontSize_2
      )}`,

      [theme.bp_moreSpacious]: {
        fontSize: theme.SiteHeading_fontSize_2_wide,
        margin: `0 0 ${getNormalizedValue(
          theme.baseline_2,
          theme.SiteHeading_fontSize_2_wide
        )}`,
        maxWidth: getNormalizedValue(
          pxToEm(396),
          theme.SiteHeading_fontSize_2_wide
        )
      },

      '@media(min-width: 67em)': {
        maxWidth: 'none'
      }
    },

    '& > p': {
      [theme.bp_home_navExpanded]: {
        maxWidth: pxToEm(396)
      },

      [theme.bp_moreSpacious]: {
        fontSize: pxToEm(18)
      },

      '@media(min-width: 67em)': {
        '&[class]': {
          maxWidth: `${611 / 18}em`
        }
      }
    }
  }),
  markdown: ({ theme }) => ({
    '& h3': {
      fontSize: theme.SiteHeading_fontSize_3,
      margin: `0 0 ${getNormalizedValue(
        theme.baseline_2,
        theme.SiteHeading_fontSize_3
      )}`,

      // Dependent on h3 content
      [theme.bp_home_bigH3]: {
        fontSize: theme.SiteHeading_fontSize_3_wide,
        margin: `0 0 ${getNormalizedValue(
          theme.baseline_2,
          theme.SiteHeading_fontSize_3_wide
        )}`
      }
    },

    '& p': {
      margin: `0 0 ${theme.baseline_2}`
    }
  }),
  playgroundCanvas: ({ index }) => ({
    background: `linear-gradient(
      ${playgroundThemes[index].color_theme_40},
      ${desaturate(0.5, playgroundThemes[index].color_theme_10)}
    )`,
    transform: 'scaleX(-1)',

    '& > svg': {
      transform: 'scale(2)'
    }
  }),
  playgroundSection: ({ index, theme }) => ({
    position: 'relative',

    '&::before': {
      background: `linear-gradient(
        ${desaturate(0.2, playgroundThemes[index].color_theme_60)},
        ${rgba(desaturate(0.2, playgroundThemes[index].color_theme_60), 0.25)}
      )`,
      bottom: 0,
      content: '""',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    },

    // Inner
    '& > div': {
      paddingTop: theme.baseline_3,

      [theme.bp_moreSpacious]: {
        paddingTop: theme.baseline_6
      }
    },

    // Playground
    '& > div > :last-child': {
      [theme.bp_home_guidelinesMultiColumn]: {
        margin: `0 ${1 / 12 * 100}%`
      }
    }
  })
};

const Root = createStyledComponent(
  'div',
  {},
  {
    includeStyleReset: true
  }
);
// Markdown must come before all of the other Markdown-based components
const Markdown = createStyledComponent(_Markdown, styles.markdown).withProps({
  anchors: false
});
const BlogLink = createStyledComponent(Link, styles.blogLink);
const Button = createThemedComponent(_Button, buttonTheme);
const Buttons = createStyledComponent('div', styles.buttons);
const ThemedCTALink = createThemedComponent(Link, CTALinkTheme);
const CTALink = createStyledComponent(ThemedCTALink, styles.CTALink);
const Feature = createStyledComponent('div', styles.feature);
const FeatureImg = createStyledComponent('img', styles.featureImg).withProps({
  alt: ''
});
const FeatureSection = createStyledComponent(Section, styles.featureSection);
const FloatingRocks = createStyledComponent(Rocks, styles.floatingRocks);
const GetStarted = createStyledComponent(Markdown, styles.getStarted);
const GetStartedBackgrounds = createStyledComponent(
  'div',
  styles.getStartedBackgrounds
);
const GetStartedContent = createStyledComponent(
  'div',
  styles.getStartedContent,
  {
    includeStyleReset: true
  }
);
const GetStartedSection = createStyledComponent(
  Section,
  styles.getStartedSection
);
const Guidelines = createStyledComponent(Markdown, styles.guidelines);
const GuidelinesSection = createStyledComponent(
  Section,
  styles.guidelinesSection
);
const Hero = createStyledComponent(Section, styles.hero);
const HeroCanvas = createStyledComponent(Canvas, styles.heroCanvas);
const Intro = createStyledComponent(Markdown, styles.intro);
const LinkButton = createStyledComponent(Button, styles.button).withProps({
  element: Link,
  size: 'jumbo'
});
const PlaygroundCanvas = createStyledComponent(Canvas, styles.playgroundCanvas);
const PlaygroundSection = createStyledComponent(
  Section,
  styles.playgroundSection
);

const GetStartedBackground = () => (
  <GetStartedBackgrounds>
    <Canvas />
    <Canvas triangles={false} />
  </GetStartedBackgrounds>
);

export default class Home extends Component<Props, State> {
  props: Props;

  state: State;

  changeTheme: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      themeIndex: 0
    };
  }

  componentDidMount() {
    this.rotateThemes(this.state.themeIndex);
  }

  render() {
    const { themeIndex } = this.state;

    return (
      <Media query="(min-width: 39em)">
        {navExpanded => (
          <Root>
            <ThemeProvider theme={heroTheme}>
              <Media query="(min-width: 48em)">
                {moreSpacious => {
                  /*
                   * [1] These values are dependent on the width of the first
                   *     Hero Button
                   */
                  let heroPoint = 1;
                  if (navExpanded) {
                    heroPoint = '12.25em'; // [1]
                  }
                  if (moreSpacious) {
                    heroPoint = '16.75em'; // [1]
                  }

                  return (
                    <Hero
                      angles={navExpanded ? [7, 8] : [5, 5]}
                      point={heroPoint}>
                      <HeroCanvas />
                      <Header latestPost={latestPost} />
                      {latestPost &&
                        navExpanded && (
                          <BlogLink href={latestPost.url}>
                            {latestPost.title}
                            <IconChevronRight size="large" />
                          </BlogLink>
                        )}
                      <Intro>{intro}</Intro>
                      <Buttons>
                        <LinkButton to="/getting-started" primary>
                          Get Started
                        </LinkButton>
                        {navExpanded && (
                          <LinkButton href="https://github.com/mineral-ui/mineral-ui">
                            View on GitHub
                          </LinkButton>
                        )}
                      </Buttons>
                    </Hero>
                  );
                }}
              </Media>
            </ThemeProvider>
            <GuidelinesSection
              angles={[5, 5]}
              // $FlowFixMe
              clipColor={desaturate(
                0.2,
                playgroundThemes[themeIndex].color_theme_60
              )}
              point={navExpanded ? '75%' : '99.999%'}>
              <Media query="(min-width: 61em)">
                {navExpanded => <FloatingRocks showRockPile={navExpanded} />}
              </Media>
              <Guidelines scope={{ CTALink, IconChevronRight }}>
                {guidelines}
              </Guidelines>
            </GuidelinesSection>
            <PlaygroundSection
              angles={[5, 3]}
              index={themeIndex}
              point={navExpanded ? '25%' : 1}>
              <PlaygroundCanvas index={themeIndex} />
              <ThemePlayground
                index={themeIndex}
                setIndex={index => {
                  this.setThemeIndex(index, true);
                }}
                themes={playgroundThemes}>
                <Media query="(min-width: 23em)">
                  {navExpanded => {
                    const playgroundButtonIcon = navExpanded ? (
                      <IconFavorite />
                    ) : (
                      undefined
                    );

                    return (
                      <Markdown
                        anchors={false}
                        scope={{ LinkButton, Link, playgroundButtonIcon }}>
                        {themePlayground}
                      </Markdown>
                    );
                  }}
                </Media>
              </ThemePlayground>
            </PlaygroundSection>
            <FeatureSection>
              <Feature>
                <FeatureImg
                  circleFill="#efdaf4"
                  src="/images/rocks/accessibility.svg"
                />
                <Markdown>{accessibility}</Markdown>
              </Feature>
              <Feature>
                <FeatureImg
                  circleFill="#d6ebdf"
                  src="/images/rocks/dropInReady.svg"
                />
                <Markdown>{dropInComponents}</Markdown>
              </Feature>
            </FeatureSection>
            <GetStartedSection
              angles={[-5, -5]}
              clipColor={colors.white}
              point="50%">
              <GetStartedBackground index={themeIndex} />
              <ThemeProvider theme={gettingStartedTheme}>
                <GetStartedContent>
                  <Logo />
                  <GetStarted scope={{ Logo }}>{getStarted}</GetStarted>
                  <Buttons>
                    <LinkButton to="/getting-started" primary>
                      Read the full documentation
                    </LinkButton>
                    <Media
                      query="(min-width: 43em)"
                      render={() => (
                        <LinkButton href="https://github.com/mineral-ui/mineral-ui">
                          View on GitHub
                        </LinkButton>
                      )}
                    />
                  </Buttons>
                </GetStartedContent>
              </ThemeProvider>
            </GetStartedSection>
            <ThemeProvider theme={gettingStartedTheme}>
              <Footer />
            </ThemeProvider>
          </Root>
        )}
      </Media>
    );
  }

  rotateThemes = (index: number, isClick?: boolean) => {
    if (isClick) {
      clearTimeout(this.changeTheme);
    }
    const newIndex = index < playgroundThemes.length - 1 ? index + 1 : 0;
    this.changeTheme = setTimeout(() => {
      this.setThemeIndex(newIndex);
    }, 12000);
  };

  setThemeIndex = (index: number, isClick?: boolean) => {
    this.setState({ themeIndex: index }, () => {
      this.rotateThemes(index, isClick);
    });
  };
}
