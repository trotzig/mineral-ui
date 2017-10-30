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
import GettingStarted from './GettingStarted';
import Styling from './Styling';
import Theming from './Theming';
import Color from './Color';
import Typography from './Typography';
import ComponentStatus from './ComponentStatus';
import Roadmap from './Roadmap';

type Page = {
  component: React$ComponentType<*>,
  id?: string,
  intro?: string,
  path: string,
  hiddenInNav?: boolean,
  title: string
};

type Pages = Array<Page>;

type Section = {
  heading: string,
  pages: Pages
};

const sections: Array<Section> = [
  {
    heading: 'Guidelines',
    pages: [
      {
        component: GettingStarted,
        intro: `# Getting Started

Mineral UI helps you quickly build React apps with high-quality, accessible components.
Use npm or yarn to get components and themes that have been tested across modern browsers.

Below are a few simple steps to apply consistent styling and hierarchy to your app,
so you can focus on solving business problems.
Mineral UI is an open source project and welcomes all contributions.`,
        path: '/getting-started',
        title: 'Getting Started'
      },
      {
        component: Color,
        intro: `# Color

Mineral UI color provides themes built on inspiring hues and grounded in usable grays.
Mineral UI is committed to providing an easy path to creating accessible palettes and themes.`,
        path: '/color',
        title: 'Color'
      },
      {
        component: Typography,
        intro: `# Typography

Mineral UI provides a simple set of typographic elements to easily apply structure to your interface.
Using consistent typographic styles will create clear paths for users to move through your application.`,
        path: '/typography',
        title: 'Typography'
      }
    ]
  },
  {
    heading: 'What’s New',
    pages: [
      {
        component: ComponentStatus,
        intro: `# Component Status

Check back here anytime to see current component status information.
If you have a suggestion for a new component not listed here, [create an issue on GitHub](https://github.com/mineral-ui/mineral-ui/issues) to let us know!

See more detailed progress on our [Waffle.io board](https://waffle.io/mineral-ui/mineral-ui).`,
        path: '/component-status',
        title: 'Component Status'
      },
      {
        component: Roadmap,
        intro: `# Roadmap

If you want to see the types of work we're doing, what's been completed and what's left to do, you've come to the right place.`,
        path: '/roadmap',
        title: 'Roadmap'
      }
    ]
  },
  {
    heading: 'Customization',
    pages: [
      {
        component: Styling,
        intro: `# Styling

Mineral UI is built on a design system with styles ready to go out of the box.  We realize however that there will be cases when you need to customize styles for your unique needs.  Below are some different techniques for customizing Mineral UI styles across all levels of your application.`,
        path: '/styling',
        title: 'Styling'
      },
      {
        component: Theming,
        intro: `# Theming

Theming is a core concept in Mineral UI.  Themes provide a consistent look and feel across pages with varied functionality.  Mineral UI makes it simple to implement and maintain theming across your app.`,
        path: '/theming',
        title: 'Theming'
      }
    ]
  }
];

export default sections;
