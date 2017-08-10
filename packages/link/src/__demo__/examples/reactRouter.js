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
import Link from '../../Link';
import {
  BrowserRouter,
  Link as ReactRouterLink,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

export default {
  title: 'ReactRouter',
  description: `This example passes a ReactRouter Link to a Mineral UI Link's element prop in order to apply Mineral UI styles and achieve client side routing.`,
  scope: { BrowserRouter, Link, ReactRouterLink, Redirect, Route, Switch },
  source: `
    <BrowserRouter>
      <Switch>
        <Route
          path="/components/:componentId/:path?"
          render={route => {
            const path = route.match.params.path;

            if ('page-2' === path) {
              return <Link to="/components/link/page-1" replace element={ReactRouterLink}>Page 1</Link>;
            }
            return <Link to="/components/link/page-2" replace element={ReactRouterLink}>Page 2</Link>;
          }}
        />
        <Redirect from="/" to="/components/link" />
      </Switch>
    </BrowserRouter>`
};