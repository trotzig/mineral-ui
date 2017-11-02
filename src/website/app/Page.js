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
import React from 'react';
import Helmet from 'react-helmet';
import { createStyledComponent, pxToEm } from '../../styles';
import { ThemeProvider } from '../../themes';
import _Canvas from './Canvas';
import _Footer from './Footer';
import Markdown from './Markdown';
import Section from './Section';
import _Nav from './Nav';
import siteColors from './siteColors';
import { heroTheme } from './pages/Home/index';

type Props = {
  children: React$Node,
  chromeless?: boolean,
  demos?: Object,
  headerContent?: React$Node,
  pageMeta?: {
    canonicalLink?: string,
    title?: string
  },
  type?: number
};

const navTheme = {
  Heading_color_4: siteColors.slate,

  SiteLink_borderColor_focus: siteColors.slate_focus,
  SiteLink_color: siteColors.slate,
  SiteLink_color_active: siteColors.slate_active,
  SiteLink_color_focus: siteColors.slate_focus,
  SiteLink_color_hover: siteColors.slate_hover
};

/*
 * [1] The left bleed of the Section needs adjusting due to the nav sidebar.
 *     Point is hardcoded to the Section padding, rather than being prop-driven.
 *     See the comment on Section's styles for more info.
 * [2] Need to target the first `p`s within the Markdown component, up until
 *     anything that isn't a `p`. Some pages have a wrapping `div` between
 *     Content and Markdown
 */

const styles = {
  canvas: ({ theme, type }) => {
    // See Router.js
    const backgrounds = [siteColors.orange, '#85144b', '#2ECC40', '#39CCCC'];

    return {
      [theme.bp_moreSpacious]: {
        backgroundColor: backgrounds[type],
        left: `calc(-50vw + 50% - ${parseFloat(theme.sidebarWidth) / 2}em)` // [1]
      }
    };
  },
  content: ({ theme }) => ({
    padding: `0 ${theme.SectionPaddingHorizontal} ${theme.baseline_3}`,

    [theme.bp_moreSpacious]: {
      marginLeft: theme.sidebarWidth,
      padding: `0 ${theme.SectionPaddingHorizontalWide} ${theme.baseline_6}`,

      // [2]
      '& > .markdown, & > div > .markdown': {
        '& > p': {
          fontSize: pxToEm(20),

          '&:first-child': {
            marginTop: theme.baseline_5
          }
        },

        '& > :not(p) ~ p': {
          fontSize: theme.fontSize_prose
        }
      }
    }
  }),
  footer: ({ theme }) => ({
    [theme.bp_moreSpacious]: {
      clear: 'both',
      paddingLeft: theme.sidebarWidth
    }
  }),
  header: ({ theme }) => ({
    marginBottom: theme.baseline_3,

    [theme.bp_moreSpacious]: {
      marginBottom: theme.baseline_6
    },

    // Inner
    '& > div': {
      paddingTop: theme.baseline_4,

      [theme.bp_moreSpacious]: {
        marginLeft: theme.sidebarWidth,
        paddingBottom: theme.baseline_6,

        '&::before': {
          left: `calc(-50vw + 50% - ${theme.SectionPaddingHorizontalWide} -
            ${parseFloat(theme.sidebarWidth) / 2}em)`, // [1]
          width: `calc(50vw - 50% + 2 * ${theme.SectionPaddingHorizontalWide} +
            ${parseFloat(theme.sidebarWidth) / 2}em)` // [1]
        },

        '&::after': {
          width: `calc(50vw - 50% + 100% -
            ${theme.SectionPaddingHorizontalWide})` // [1]
        }
      }
    },

    // Specificity hack
    '& p[class]': {
      fontSize: theme.fontSize_ui,
      margin: 0,
      marginBottom: theme.baseline_1
    },

    '& h1': {
      fontSize: theme.SiteHeading_fontSize_2,
      margin: 0,

      [theme.bp_moreSpacious]: {
        fontSize: theme.SiteHeading_fontSize_2_wide
      }
    }
  }),
  nav: ({ theme }) => ({
    [theme.bp_moreSpacious]: {
      float: 'left',
      maxHeight: '100vh',
      overflow: 'auto',
      position: 'sticky',
      top: 10,
      width: theme.sidebarWidth
    }
  }),
  root: ({ theme }) => ({
    fontFamily: theme.fontFamily_system
  })
};

const Root = createStyledComponent('div', styles.root, {
  includeStyleReset: true
});
const Canvas = createStyledComponent(_Canvas, styles.canvas);
const Content = createStyledComponent('main', styles.content);
const Footer = createStyledComponent(_Footer, styles.footer);
const Nav = createStyledComponent(_Nav, styles.nav);
const Header = createStyledComponent(Section, styles.header);

export default function Page({
  children,
  chromeless,
  demos,
  headerContent,
  pageMeta,
  type = 0,
  ...restProps
}: Props) {
  const rootProps = { ...restProps };
  const helmetItems = pageMeta && (
    <Helmet>
      <link rel="canonical" href={pageMeta.canonicalLink} />
      <title>{pageMeta.title}</title>
    </Helmet>
  );
  return chromeless ? (
    <div>
      {helmetItems}
      {children}
    </div>
  ) : (
    <Root {...rootProps}>
      {helmetItems}
      {headerContent && (
        <ThemeProvider theme={heroTheme}>
          <Header angles={[5, 6]} as="header" point={1 / 1000}>
            <Canvas type={type} />
            {typeof headerContent === 'string' ? (
              <Markdown>{headerContent}</Markdown>
            ) : (
              headerContent
            )}
          </Header>
        </ThemeProvider>
      )}
      <ThemeProvider theme={navTheme}>
        <Nav demos={demos} />
      </ThemeProvider>
      <Content>{children}</Content>
      <Footer />
    </Root>
  );
}
