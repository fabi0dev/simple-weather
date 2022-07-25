export const theme = {
  space: {
    none: 0,
    quarck: 1,
    prim: 3,
    qm: 5,
    cake: 8,
    nano: 13,
    xxxs: 16,
    xx: 20,
    xxs: 24,
    xs: 32,
    sm: 40,
    md: 48,
    xl: 64,
    xxl: 80,
  },
  colors: {
    primary: '#18C4FF',
    blue: '#3399FF',
    blueDark: '#175b9f',
    blueLight: '#BDDEFF',
    blueLightest: '#EAF5FF',

    lilac: '#D8D8E8',
    lilacLight: '#f9f9f9',

    grey01: '#33303E',
    grey02: '#4E4B59',
    grey03: '#5F5C6B',
    base: '#FFF',
    base2: 'rgba(255,255,255, .5)',
    base3: '#232532',
    base4: 'rgba(0,0,0, .05)',
    base5: 'rgba(0,0,0, .1)',
    base6: 'rgba(255,255,255,.8)',
    red: "#ff0000"
  },
  fonts: {
    medium: 'Inter Medium',
    regular: 'Inter Regular',
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48],
  radii: {
    nano: 6,
    xxxs: 10,
    default: 8,
    xs: 15,
    xi: 100,
    infinity: 999999,
  },
  borderWidths: {
    nano: 1,
    prim: 2,
    quarck: 1.5,
    xxxs: 3,
    xs: 6,
  },
};

export type ThemeProps = typeof theme;
