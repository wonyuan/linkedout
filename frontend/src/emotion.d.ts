import '@mantine/core';

import type { EmotionStyles, EmotionSx } from '@mantine/emotion';

declare module '@mantine/core' {
  export interface BoxProps {
    sx?: EmotionSx;
    styles?: EmotionStyles;
  }
  export interface FlexProps {
    sx?: EmotionSx;
    styles?: EmotionStyles;
  }
  export interface IconBrandLinkedinProps {
    sx?: EmotionSx;
    styles?: EmotionStyles;
  }
}