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
import { withRouter } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { canUseDOM } from 'exenv';
import { createStyledComponent, pxToEm } from '../../styles';
import { mineralTheme, ThemeProvider } from '../../themes';
import BaselineGrid from './BaselineGrid';
import _Footer from './Footer';
import _Nav from './Nav';
import Router from './Router';
import siteColors from './siteColors';
import createKeyMap from './utils/createKeyMap';
import ComponentDoc from './pages/ComponentDoc';
import Home from './pages/Home';

declare var GOOGLE_TRACKING_ID: string;

type Props = {
  children?: any,
  className?: string,
  demos: Object | Array<Object>,
  history: Object,
  location?: any
};

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

  bp_moreSpacious: '@media(min-width: 48em)',

  bp_home_smallH3AndDown: '@media(max-width: 29.999em)',
  bp_home_bigH3: '@media(min-width: 30em)',
  bp_home_navCollapsedAndDown: '@media(max-width: 38.999em)',
  bp_home_navExpanded: '@media(min-width: 39em)',
  bp_home_getStartedLeftAlign: '@media(min-width: 43em)',
  bp_home_betweenMoreSpaciousAndGuidelinesMultiColumn:
    '@media(min-width: 48em) and (max-width: 60.999em)',
  bp_home_guidelinesMultiColumn: '@media(min-width: 61em)',

  sidebarWidth: pxToEm(180),

  color_text: siteColors.slate_active,
  fontFamily: null,
  fontFamily_headline: `franklin-gothic-urw, ${mineralTheme.fontFamily_system}`,

  SectionPaddingHorizontal: pxToEm(30),
  SectionPaddingHorizontalWide: pxToEm(100),
  SectionPaddingVertical: pxToEm(13 * 6), // theme.baseline_6
  SectionPaddingVerticalWide: pxToEm(13 * 10), // theme.baseline_10

  SiteHeading_color_3: siteColors.orange,
  SiteHeading_fontFamily: `franklin-gothic-urw, ${mineralTheme.fontFamily_system}`,
  SiteHeading_fontSize_2: pxToEm(39),
  SiteHeading_fontSize_2_wide: pxToEm(59),
  SiteHeading_fontSize_3: pxToEm(26),
  SiteHeading_fontSize_3_wide: pxToEm(37),
  SiteHeading_fontWeight_1: '300',
  SiteHeading_fontWeight_2: '300',
  SiteHeading_fontWeight_3: '300',
  SiteHeading_fontWeight_4: '500',
  SiteHeading_lineHeight: '1.1',

  SiteLink_borderColor_focus: siteColors.orange_focus,
  SiteLink_color: siteColors.orange,
  SiteLink_color_active: siteColors.orange_active,
  SiteLink_color_hover: siteColors.orange_hover,
  SiteLink_color_focus: siteColors.orange_focus
};
const navTheme = {
  Heading_color_4: siteColors.slate,

  Link_color: siteColors.slate,
  Link_color_active: siteColors.slate_active,
  Link_color_focus: siteColors.slate_focus,
  Link_color_hover: siteColors.slate_hover
};

const styles = {
  app: ({ theme }) => ({
    fontFamily: theme.fontFamily_system
  }),
  footer: ({ theme }) => ({
    [theme.bp_moreSpacious]: {
      marginLeft: theme.sidebarWidth
    }
  }),
  nav: ({ theme }) => ({
    [theme.bp_moreSpacious]: {
      // maxHeight: '100vh', // Only apply this when sticky
      // overflow: 'auto', // Only apply this when sticky
      position: 'absolute',
      width: theme.sidebarWidth,
      top: 302, // Magic number to baseline align logo bottom with second line of page intro
      zIndex: 2
    }
  })
};

const Root = createStyledComponent('div', styles.app, {
  includeStyleReset: true
});
const Footer = createStyledComponent(_Footer, styles.footer);
const Nav = createStyledComponent(_Nav, styles.nav);

class App extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    if (GOOGLE_TRACKING_ID) {
      // Analytics tracking of push state page views
      props.history.listen((location, action) => {
        if (canUseDOM && action === 'PUSH') {
          global.window.gtag('config', GOOGLE_TRACKING_ID, {
            page_path: location.pathname
          });
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (canUseDOM && this.props.location !== prevProps.location) {
      global.window.scrollTo(0, 0);
    }
  }

  render() {
    const { className, demos } = this.props;

    if (!Array.isArray(demos) && demos.slug) {
      return <ComponentDoc {...demos} />;
    }

    const siteDemos = Array.isArray(demos)
      ? createKeyMap(demos, 'slug')
      : demos;

    return (
      <ThemeProvider theme={rootTheme}>
        <div>
          <Switch>
            <Route
              exact
              strict
              path="/:url*"
              render={props => <Redirect to={`${props.location.pathname}/`} />}
            />
            <Route path="/" exact component={Home} />
            <Route
              render={route => {
                const isChromeless = route.location.search === '?chromeless';
                return isChromeless ? (
                  <Router demos={siteDemos} />
                ) : (
                  <Root className={className}>
                    <ThemeProvider theme={navTheme}>
                      <Nav demos={siteDemos} />
                    </ThemeProvider>
                    <Router demos={siteDemos} />
                    <Footer />
                  </Root>
                );
              }}
            />
          </Switch>
          <BaselineGrid />
        </div>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
