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
import {
  color,
  createStyledComponent,
  createThemedComponent,
  getNormalizedValue,
  mineralTheme,
  pxToEm
} from '../../../../utils';
import Button from '../../../../Button';
import IconChevronRight from '../../../../Icon/IconChevronRight';
import IconFavorite from '../../../../Icon/IconFavorite';
import ThemeProvider from '../../../../ThemeProvider';
import Link from '../../Link';
import Logo from '../../Logo';
import _Markdown from '../../Markdown';
import Canvas from './Canvas';
import Footer from './Footer';
import Header from './Header';
import Rocks from './Rocks';
import Section from './Section';
import ThemePlayground from './ThemePlayground';
import triangles from './triangles';
import accessibility from './content/accessibility.md';
import dropInComponents from './content/dropInComponents.md';
import footer from './content/footer.md';
import getStarted from './content/getStarted.md';
import guidelines from './content/guidelines.md';
import intro from './content/intro.md';
import themePlayground from './content/themePlayground.md';

// Temp
import magenta from './themes/magenta';
import teal from './themes/teal';
import sky from './themes/sky';

type Props = {};

type State = {
  themeIndex: number
};

// export function pxToEm(value: number) {
//   return `${value / 18}em`;
// }

const latestPost = {
  title: 'How we built our site using our components',
  url: 'https://medium.com'
};

const mineralColor = {
  orange: color.orange_50,
  orange_active: color.orange_60,
  orange_focus: color.orange_50,
  orange_hover: color.orange_40,
  yellow: color.yellow_50,
  yellow_active: color.yellow_60,
  yellow_focus: color.yellow_50,
  yellow_hover: color.yellow_40,
  slate: color.slate_60,
  slate_active: color.slate_70,
  slate_focus: color.slate_60,
  slate_hover: color.slate_50
};

const playgroundThemes = [
  { name: 'Magenta', ...magenta, color_text: mineralColor.slate },
  { name: 'Teal', ...teal, color_text: mineralColor.slate },
  { name: 'Sky', ...sky, color_text: mineralColor.slate }
];

const rootTheme = {
  baseline_1: pxToEm(13),
  baseline_2: pxToEm(13 * 2),
  baseline_3: pxToEm(13 * 3),
  baseline_4: pxToEm(13 * 4),
  baseline_5: pxToEm(13 * 5),
  baseline_6: pxToEm(13 * 6),
  baseline_7: pxToEm(13 * 7),
  baseline_8: pxToEm(13 * 8),
  baseline_9: pxToEm(13 * 9),
  baseline_10: pxToEm(13 * 10),

  color_text: mineralColor.slate,
  fontFamily: null,
  fontFamily_headline: `franklin-gothic-urw, ${mineralTheme.fontFamily_system}`,

  Button_fontWeight: mineralTheme.fontWeight_regular,
  Button_height_jumbo: pxToEm(39),
  Button_paddingHorizontal: pxToEm(16), // For a total of 32
  ButtonContent_fontSize: pxToEm(19),

  Heading_color_3: mineralColor.orange,
  Heading_fontFamily: `franklin-gothic-urw, ${mineralTheme.fontFamily_system}`,
  Heading_fontSize_2: pxToEm(39),
  Heading_fontSize_2_wide: pxToEm(59),
  Heading_fontSize_3: pxToEm(26),
  Heading_fontSize_3_wide: pxToEm(37),
  Heading_fontWeight_1: '300',
  Heading_fontWeight_2: '300',
  Heading_fontWeight_3: '300',
  Heading_fontWeight_4: '500',
  Heading_lineHeight: '1.1'
};
const heroTheme = {
  color_text: color.white,

  Button_backgroundColor_primary: mineralColor.orange,
  Button_backgroundColor_primary_active: mineralColor.orange_active,
  Button_backgroundColor_primary_focus: mineralColor.orange_focus,
  Button_backgroundColor_primary_hover: mineralColor.orange_hover,
  Button_color_text: mineralColor.slate_active,

  Heading_color_2: color.white,

  Link_color: color.white,
  Link_color_active: color.gray_10,
  Link_color_focus: color.white,
  Link_color_hover: color.white
};
const gettingStartedTheme = {
  color_text: color.white,

  Button_backgroundColor_primary: mineralColor.yellow,
  Button_backgroundColor_primary_active: mineralColor.yellow_active,
  Button_backgroundColor_primary_focus: mineralColor.yellow_focus,
  Button_backgroundColor_primary_hover: mineralColor.yellow_hover,

  Button_color_text: color.gray_100,
  Button_color_text_primary: color.gray_100,

  Heading_color_3: color.white,
  Heading_color_4: color.white,

  Link_color: mineralColor.yellow,
  Link_color_active: mineralColor.yellow_active,
  Link_color_focus: mineralColor.yellow_focus,
  Link_color_hover: mineralColor.yellow_hover
};
const CTALinkTheme = {
  Link_borderColor_focus: mineralColor.orange_focus,
  Link_color: mineralColor.orange,
  Link_color_active: mineralColor.orange_active,
  Link_color_hover: mineralColor.orange_hover,
  Link_color_focus: mineralColor.orange_focus
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
      backgroundColor: mineralColor.orange_active,
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

    '@media(min-width: 39em)': {
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
  featureSection: {
    // Inner
    '& > div': {
      '@media(min-width: 39em)': {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }
  },
  floatingRocks: ({ theme }) => ({
    height: 150,
    margin: `0 auto ${theme.baseline_3}`,
    width: 300,

    '@media(min-width: 61em)': {
      height: 300,
      flex: `0 0 300px`,
      order: 2,
      margin: 0
    }
  }),
  getStarted: ({ theme }) => ({
    // TODO: Specificity hack
    '& > h3[id]': {
      margin: `0 0 ${getNormalizedValue(
        theme.baseline_6,
        theme.Heading_fontSize_3_wide
      )}`,
      textAlign: 'center',

      '@media(max-width: 29.999em)': {
        margin: `0 0 ${getNormalizedValue(
          theme.baseline_6,
          theme.Heading_fontSize_3
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

      '@media(min-width: 39em)': {
        paddingTop: 0
      },

      '& + li': {
        marginTop: theme.baseline_6
      },

      '&::before': {
        backgroundColor: mineralColor.yellow,
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

        '@media(min-width: 39em)': {
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
        fontWeight: theme.Heading_fontWeight_4,
        margin: `0 0 ${getNormalizedValue(theme.baseline_2, theme.fontSize_h4)}`
      }
    },

    '& :not(pre) > code': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      color: theme.color_text
    },

    '& pre': {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      maxHeight: 'none'
    }
  }),
  getStartedBackgrounds: ({ theme }) => ({
    '& > :nth-child(1)': {
      backgroundColor: theme.color_gray_100,
      bottom: 'auto',
      zIndex: '-2',

      '& > svg': {
        mixBlendMode: 'luminosity',
        transform: 'translateX(50%) rotate(180deg) scale(2)'
      }
    },

    '& > :nth-child(2)': {
      background: `linear-gradient(
        rgba(0,0,0,0.4),
        ${theme.color_gray_100}
      )`
    },

    '& > :nth-child(3)': {
      background: `repeating-linear-gradient(
        -45deg,
        rgba(255,255,255,0.025),
        rgba(255,255,255,0.025) 1px,
        rgba(0,0,0,0) 1px,
        rgba(0,0,0,0) 6px
      )`
    }
  }),
  getStartedContent: ({ theme }) => ({
    margin: '0 auto',
    maxWidth: 'min-content',
    textAlign: 'center',

    '@media(min-width: 39em)': {
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

    // TODO: Maybe not necessary?
    '&::before': {
      backgroundColor: theme.color_gray_100,
      bottom: 0,
      content: '""',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: '-2'
    },

    // Inner
    '& > div': {
      '@media(min-width: 48em)': {
        paddingTop: theme.baseline_7 // Optical adjustment
      }
    }
  }),
  guidelines: {
    textAlign: 'center',

    '@media(min-width: 61em)': {
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
  },
  guidelinesSection: {
    // Inner
    '& > div': {
      '@media(min-width: 61em)': {
        alignItems: 'center',
        display: 'flex'
      }
    },

    // Guidelines
    '& > div > :last-child': {
      '@media(min-width: 48em) and (max-width: 60.999em)': {
        margin: `0 ${1 / 12 * 100}%`
      }
    }
  },
  hero: {
    // Inner
    '> div': {
      paddingTop: 0,

      '@media(min-width: 39em)': {
        justifyContent: 'space-between'
      }
    }
  },
  heroCanvas: {
    backgroundColor: mineralColor.slate,

    '@media(max-width: 38.999em)': {
      bottom: '-14.5em' // Matches change in Header margin due to open menu
    },

    '& > svg': {
      mixBlendMode: 'hard-light'
    }
  },
  intro: ({ theme }) => ({
    // All of these numbers are dependent on width of h2 content
    '& h2': {
      fontSize: theme.Heading_fontSize_2,
      margin: `0 0 ${getNormalizedValue(
        theme.baseline_2,
        theme.Heading_fontSize_2
      )}`,

      '@media(min-width: 48em)': {
        fontSize: theme.Heading_fontSize_2_wide,
        margin: `0 0 ${getNormalizedValue(
          theme.baseline_2,
          theme.Heading_fontSize_2_wide
        )}`,
        maxWidth: getNormalizedValue(pxToEm(396), theme.Heading_fontSize_2_wide)
      },

      '@media(min-width: 67em)': {
        maxWidth: 'none'
      }
    },

    '& > p': {
      '@media(min-width: 39em)': {
        maxWidth: pxToEm(396)
      },

      '@media(min-width: 67em)': {
        '&[class]': {
          maxWidth: pxToEm(611)
        }
      }
    }
  }),
  markdown: ({ theme }) => ({
    '& h3': {
      fontSize: theme.Heading_fontSize_3,
      margin: `0 0 ${getNormalizedValue(
        theme.baseline_2,
        theme.Heading_fontSize_3
      )}`,

      // Dependent on h3 content | TODO: test this
      '@media(min-width: 30em)': {
        fontSize: theme.Heading_fontSize_3_wide,
        margin: `0 0 ${getNormalizedValue(
          theme.baseline_2,
          theme.Heading_fontSize_3_wide
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
      mixBlendMode: 'hard-light',
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

      '@media(min-width: 48em)': {
        paddingTop: theme.baseline_6
      }
    },

    // Playground
    '& > div > :last-child': {
      '@media(min-width: 61em)': {
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
const LinkButton = createStyledComponent(Button, styles.button).withProps({
  element: Link,
  size: 'jumbo'
});
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
  styles.getStartedContent
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
const PlaygroundCanvas = createStyledComponent(Canvas, styles.playgroundCanvas);
const PlaygroundSection = createStyledComponent(
  Section,
  styles.playgroundSection
);

const GetStartedBackground = () => (
  <GetStartedBackgrounds>
    <Canvas />
    <Canvas triangles={false} />
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
    triangles();
    this.rotateThemes(this.state.themeIndex);
  }

  render() {
    const { themeIndex } = this.state;

    return (
      <Media query="(min-width: 39em)">
        {matches => (
          <ThemeProvider theme={rootTheme}>
            <Root>
              <ThemeProvider theme={heroTheme}>
                <Hero
                  angles={matches ? [7, 8] : [5, 5]}
                  point={matches ? 1 / 4 : 1 / 1000}>
                  <HeroCanvas />
                  <Header latestPost={latestPost} />
                  {latestPost &&
                    matches && (
                      <BlogLink to={latestPost.url}>
                        {latestPost.title}
                        <IconChevronRight size="large" />
                      </BlogLink>
                    )}
                  <Intro>{intro}</Intro>
                  <Buttons>
                    <LinkButton to="/getting-started" primary>
                      Get Started
                    </LinkButton>
                    {matches && (
                      <LinkButton href="https://github.com/mineral-ui/mineral-ui">
                        View on GitHub
                      </LinkButton>
                    )}
                  </Buttons>
                </Hero>
              </ThemeProvider>
              <GuidelinesSection
                angles={[5, 5]}
                // $FlowFixMe
                clipColor={desaturate(
                  0.2,
                  playgroundThemes[themeIndex].color_theme_60
                )}
                point={matches ? 3 / 4 : 999 / 1000}>
                <Media query="(min-width: 61em)">
                  {matches => <FloatingRocks showRockPile={matches} />}
                </Media>
                <Guidelines scope={{ CTALink, IconChevronRight }}>
                  {guidelines}
                </Guidelines>
              </GuidelinesSection>
              <PlaygroundSection
                angles={[5, 3]}
                index={themeIndex}
                point={matches ? 1 / 4 : 1 / 1000}>
                <PlaygroundCanvas index={themeIndex} />
                <ThemePlayground
                  index={themeIndex}
                  setIndex={index => {
                    this.setThemeIndex(index, true);
                  }}
                  themes={playgroundThemes}>
                  <Media query="(min-width: 23em)">
                    {matches => {
                      const playgroundButtonIcon = matches ? (
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
                clipColor={color.white}
                point={1 / 2}>
                <GetStartedBackground index={themeIndex} />
                <ThemeProvider theme={gettingStartedTheme}>
                  <GetStartedContent>
                    <Logo fill="#fff" />
                    <GetStarted scope={{ Logo }}>{getStarted}</GetStarted>
                    <Buttons>
                      <LinkButton to="/getting-started" primary>
                        Read the full documentation
                      </LinkButton>
                      {matches && (
                        <LinkButton href="https://github.com/mineral-ui/mineral-ui">
                          View on GitHub
                        </LinkButton>
                      )}
                    </Buttons>
                  </GetStartedContent>
                </ThemeProvider>
              </GetStartedSection>
              <ThemeProvider theme={gettingStartedTheme}>
                <Footer>
                  <Markdown>{footer}</Markdown>
                </Footer>
              </ThemeProvider>
            </Root>
          </ThemeProvider>
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
