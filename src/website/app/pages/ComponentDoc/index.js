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
import { mineralTheme } from '../../../../themes';
import Heading from '../../SiteHeading';
import DocBestPractices from './DocBestPractices';
import DocExamples from './DocExamples';
import DocIntro from './DocIntro';
import DocProps from './DocProps';
import DocSubNav from './DocSubNav';
import DocThemeVariables from './DocThemeVariables';
import DocWhenHowToUse from './DocWhenHowToUse';

type Props = {
  bestPractices?: Array<BestPractice>,
  className?: string,
  componentTheme?: Theme | Array<Theme>,
  description?: React$Node,
  doc: Object,
  examples?: Array<any>,
  hidePropDoc?: boolean,
  pageMeta: {
    title: string,
    canonicalLink: string
  },
  title: string,
  whenHowToUse?: string
};

type BestPractice = {
  type: string,
  title: string,
  example: React$Node,
  description: string
};

type Theme = (theme: Object) => Object;

export default function ComponentDoc({
  bestPractices,
  doc,
  examples,
  hidePropDoc,
  componentTheme,
  title,
  whenHowToUse,
  ...restProps
}: Props) {
  const { props: propDoc } = doc;
  const subNavProps = {
    bestPractices,
    componentTheme,
    examples,
    props: !!(propDoc || componentTheme),
    whenHowToUse
  };
  const rootProps = {
    ...restProps
  };
  delete rootProps.slug;
  const propProps = { propDoc, title };
  const themeVariablesProps = {
    baseTheme: mineralTheme,
    componentTheme,
    title
  };

  return (
    <div {...rootProps}>
      {doc.description && <DocIntro>{doc.description}</DocIntro>}
      <DocSubNav {...subNavProps} />
      {examples && <DocExamples examples={examples} />}
      {!hidePropDoc && <DocProps {...propProps} />}
      {componentTheme && <DocThemeVariables {...themeVariablesProps} />}
      {(whenHowToUse || bestPractices) && (
        <Heading level={2} id="usage">
          Usage
        </Heading>
      )}
      {whenHowToUse && <DocWhenHowToUse content={whenHowToUse} />}
      {bestPractices && <DocBestPractices practices={bestPractices} />}
    </div>
  );
}
