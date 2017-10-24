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
import { createStyledComponent, getNormalizedValue } from '../../../../utils';
import Link from '../../Link';
import Section from './Section';

type Props = {};

const Root = createStyledComponent(
  Section,
  ({ theme }) => ({
    backgroundColor: theme.color_gray_100,
    color: theme.color_gray_40,

    // Inner
    '& > div': {
      paddingBottom: 0,
      paddingTop: 0,

      '& > p': {
        fontSize: theme.fontSize_mouse,
        margin: 0,
        padding: `${getNormalizedValue(
          theme.space_inset_sm,
          theme.fontSize_mouse
        )} 0`
      },

      '@media(min-width: 39em)': {
        display: 'flex',

        '& > :last-child': {
          marginLeft: 'auto'
        }
      }
    }
  }),
  {
    includeStyleReset: true
  }
);

export default function Footer({ ...restProps }: Props) {
  return (
    <Root {...restProps}>
      <p>Copyright © 2017 CA</p>
      <p>
        We welcome feedback and contributions on {' '}
        <Link href="https://github.com/mineral-ui/mineral-ui">GitHub</Link>
      </p>
    </Root>
  );
}
