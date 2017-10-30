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
import {
  createStyledComponent,
  getNormalizedValue,
  pxToEm
} from '../../styles';
import { ThemeProvider } from '../../themes';
import Markdown from './Markdown';
import siteColors from './siteColors';
import { heroTheme } from './pages/Home/index';
import _Canvas from './pages/Home/Canvas';
import _Section from './pages/Home/Section';

type Props = {
  children: React$Node,
  headerContent?: React$Node,
  type?: string
};

/*
 * [1] The left bleed of the Section needs adjusting due to the nav sidebar.
 * See the comment on Section's styles for more info.
 */

const styles = {
  canvas: ({ theme, type }) => {
    const backgrounds = {
      Component: siteColors.orange,
      Customization: siteColors.yellow,
      Guidelines: siteColors.yellow,
      'What’s New': siteColors.slate
    };
    return {
      [theme.bp_moreSpacious]: {
        backgroundColor: type ? backgrounds[type] : backgrounds['Component'],
        left: `calc(-50vw + 50% - ${parseFloat(theme.sidebarWidth) / 2}em)` // [1]
      }
    };
  },
  content: ({ theme }) => ({
    padding: `0 ${theme.SectionPaddingHorizontal}`,

    [theme.bp_moreSpacious]: {
      marginLeft: theme.sidebarWidth,
      padding: `0 ${theme.SectionPaddingHorizontalWide}`
    }
  }),
  section: ({ point, theme }) => ({
    // Inner
    '& > div': {
      paddingTop: theme.baseline_4,

      [theme.bp_moreSpacious]: {
        marginLeft: theme.sidebarWidth,
        paddingBottom: theme.baseline_6,

        '&::before': {
          left: `calc(-50vw + 50% - ${parseFloat(theme.sidebarWidth) / 2}em)`, // [1]
          width: `calc(50vw - 50% + ${point * 100}% +
            ${parseFloat(theme.sidebarWidth) / 2}em)` // [1]
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
const Content = createStyledComponent('div', styles.content);
const Section = createStyledComponent(_Section, styles.section);

export default function Page({
  children,
  headerContent,
  type,
  ...restProps
}: Props) {
  const rootProps = { ...restProps };
  return (
    <div {...rootProps}>
      <ThemeProvider theme={heroTheme}>
        <Section angles={[7, 8]} point={1 / 4}>
          <Canvas type={type} />
          {typeof headerContent === 'string' ? (
            <Markdown>{headerContent}</Markdown>
          ) : (
            headerContent
          )}
        </Section>
      </ThemeProvider>
      <Content>{children}</Content>
    </div>
  );
}
