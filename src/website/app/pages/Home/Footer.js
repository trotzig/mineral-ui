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
import { createStyledComponent, getNormalizedValue } from '../../../../utils';
import Section from './Section';

export default createStyledComponent(
  Section,
  ({ theme }) => ({
    backgroundColor: theme.color_black,
    color: theme.color_gray_40,

    // Inner
    '& > div': {
      paddingBottom: 1, // To prevent margin collapse
      paddingTop: 1, // To prevent margin collapse

      // Markdown
      '& > div': {
        '& > p': {
          fontSize: theme.fontSize_mouse,
          lineHeight: theme.lineHeight,
          margin: `${getNormalizedValue(
            theme.baseline_1,
            theme.fontSize_mouse
          )} 0`
        },

        '@media(min-width: 39em)': {
          display: 'flex',

          '& > p:last-child': {
            marginLeft: 'auto'
          }
        }
      }
    }
  }),
  {
    includeStyleReset: true
  }
);
