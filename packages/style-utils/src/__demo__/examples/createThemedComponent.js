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
import { createThemedComponent } from '../../index';
import Sample from '../../Sample';

const MyThemedSample = createThemedComponent(Sample, {
  color_primary: 'mediumvioletred'
});

function CreateThemedComponent() {
  return (
    <div>
      <MyThemedSample />
    </div>
  );
}

export default {
  title: 'Local theme var override via createThemedComponent',
  component: CreateThemedComponent,
  description: 'If you need to overwrite a theme variable, either global or component-specific, for a specific component.',
  source: `const MyThemedSample = createThemedComponent(Sample, {
color_primary: 'mediumvioletred'
});

<MyThemedSample />`
};