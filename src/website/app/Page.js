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
import {
  createStyledComponent,
  getNormalizedValue,
  pxToEm
} from '../../styles';
import { ThemeProvider } from '../../themes';
import _Canvas from './Canvas';
import Markdown from './Markdown';
import _Section from './Section';
import siteColors from './siteColors';
import { heroTheme } from './pages/Home/index';

type Props = {
  children: React$Node,
  headerContent?: React$Node,
  pageMeta?: {
    canonicalLink?: string,
    title?: string
  },
  type?: number
};

/*
 * [1] Need to target the first `p`s within the Markdown component, up until
 *     anything that isn't a `p`. Some pages have a wrapping `div` between
 *     Content and Markdown
 * [2] The left bleed of the Section needs adjusting due to the nav sidebar.
 *     Point is hardcoded to the Section padding, rather than being prop-driven.
 *     See the comment on Section's styles for more info.
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
    padding: `0 ${theme.SectionPaddingHorizontal}`,

    [theme.bp_moreSpacious]: {
      marginLeft: theme.sidebarWidth,
      padding: `0 ${theme.SectionPaddingHorizontalWide}`
    },

    // [1]
    '& > .markdown, & > div > .markdown': {
      '& > p': {
        fontSize: pxToEm(20)
      },

      '& > :not(p) + p': {
        fontSize: theme.fontSize_prose
      }
    }
  }),
  section: ({ theme }) => ({
    // Inner
    '& > div': {
      paddingTop: theme.baseline_4,

      [theme.bp_moreSpacious]: {
        marginLeft: theme.sidebarWidth,
        paddingBottom: theme.baseline_6,

        '&::before': {
          left: `calc(-50vw + 50% - ${theme.SectionPaddingHorizontalWide} -
            ${parseFloat(theme.sidebarWidth) / 2}em)`, // [2]
          width: `calc(50vw - 50% + 2 * ${theme.SectionPaddingHorizontalWide} +
            ${parseFloat(theme.sidebarWidth) / 2}em)` // [2]
        },

        '&::after': {
          width: `calc(50vw - 50% + 100% -
            ${theme.SectionPaddingHorizontalWide})` // [2]
        }
      }
    },

    // TODO: All of these styles come from Home's Intro
    '& h1': {
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

    '& p': {
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
  })
};

const Canvas = createStyledComponent(_Canvas, styles.canvas);
const Content = createStyledComponent('main', styles.content);
const Section = createStyledComponent(_Section, styles.section);

export default function Page({
  children,
  headerContent,
  pageMeta,
  type = 0,
  ...restProps
}: Props) {
  const rootProps = { ...restProps };
  return (
    <div {...rootProps}>
      {pageMeta && (
        <Helmet>
          <link rel="canonical" href={pageMeta.canonicalLink} />
          <title>{pageMeta.title}</title>
        </Helmet>
      )}
      {headerContent && (
        <ThemeProvider theme={heroTheme}>
          <Section angles={[5, 6]} as="header" point={1 / 1000}>
            <Canvas type={type} />
            {typeof headerContent === 'string' ? (
              <Markdown>{headerContent}</Markdown>
            ) : (
              headerContent
            )}
          </Section>
        </ThemeProvider>
      )}
      <Content>{children}</Content>
    </div>
  );
}
