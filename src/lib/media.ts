export const mediaQuery = (maxWidth: number) =>
  `@media(max-width: ${maxWidth}px)`;

const media = {
  xxlarge: mediaQuery(1919), // 1920x
  xlarge: mediaQuery(1439), // Laptop M
  large: mediaQuery(1023), // laptop
  medium: mediaQuery(767), // Tablet
  small: mediaQuery(424), // Mobile L
  xsmall: mediaQuery(374), // Mobile M
  xxsmall: mediaQuery(319), // Mobile S
  custom: mediaQuery,
};

export default media;
