/* @flow */
import { createStyledComponent, getResponsiveStyles } from '../styles';
import Box from '../Box';
import ActualFlex from './Flex';

import type { CreateRootNode, StyleValue } from '../styles/types';
import type { FlexItemProps } from './types';

const getAlignment = (value: string): string =>
  ['start', 'end'].indexOf(value) !== -1 ? `flex-${value}` : value;

const getJustification = (value: string): string =>
  ['around', 'between', 'evenly'].indexOf(value) !== -1
    ? `space-${value}`
    : getAlignment(value);

const flexMapValueToProperty = (
  property: string,
  value: StyleValue
): number | string => {
  const map = {
    alignItems: getAlignment,
    display: (value) =>
      value === undefined || value === false ? 'flex' : 'inline-flex',
    flexDirection: (value) => value,
    flexWrap: (value) => (value ? 'wrap' : value === false ? 'nowrap' : value),
    justifyContent: getJustification
  };

  return map[property](value);
};

export const FlexRoot = createStyledComponent(
  Box,
  ({
    breakpoints,
    alignItems,
    direction,
    inline,
    justifyContent,
    theme,
    wrap
  }) =>
    getResponsiveStyles({
      breakpoints,
      mapValueToProperty: flexMapValueToProperty,
      styles: {
        alignItems,
        display: inline,
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent
      },
      theme
    }),
  {
    displayName: 'Flex',
    filterProps: ['inline']
  }
);

const flexItemMapValueToProperty = (
  property: string,
  value: StyleValue
): number | string => {
  const map = {
    alignSelf: (value) =>
      value === 'start' || value === 'end' ? `flex-${value}` : value,
    flexBasis: (value) =>
      typeof value === 'number' && value < 1 && value !== 0
        ? `${value * 100}%`
        : value,
    flexGrow: (value) => value,
    flexShrink: (value) => value
  };

  return map[property](value);
};

export const createFlexItemRootNode: CreateRootNode<FlexItemProps> = (
  props
) => {
  const component = props.flex ? ActualFlex : Box;

  return createStyledComponent(
    component,
    ({ alignSelf, breakpoints, grow, shrink, theme, width }) =>
      getResponsiveStyles({
        breakpoints,
        mapValueToProperty: flexItemMapValueToProperty,
        styles: {
          alignSelf,
          flexBasis: width || 'auto',
          flexGrow: grow,
          flexShrink: shrink
        },
        theme
      }),
    {
      displayName: 'FlexItem',
      filterProps: ['inline', 'width']
    }
  );
};
