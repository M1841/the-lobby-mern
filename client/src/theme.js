export const colorTokens = {
    grey: {
      1:    "#607d8b50",
      0:    "#fafafa",
      50:   "#eceff1",
      100:  "#cfd8dc",
      200:  "#b0bec5",
      300:  "#90a4ae",
      400:  "#78909c",
      500:  "#607d8b",
      600:  "#546e7a",
      700:  "#455a64",
      800:  "#37474f",
      850:  "#314046",
      900:  "#263238",
      1000: "#101010",
      1001: "#78909c25"
    },
    primary: {
      50:  "#e0f2f1",
      100: "#b2dfdb",
      200: "#80cbc4",
      300: "#4db6ac",
      400: "#20a995",
      500: "#009688",
      600: "#00897b",
      700: "#00796b",
      800: "#00695c",
      850: "#b7a6dd",
      900: "#004d40",
    },
};

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark") ? {
                // DARK MODE
                primary: {
                    dark: colorTokens.primary[200],
                    main: colorTokens.primary[400],
                    light: colorTokens.primary[700]
                },
                secondary: {
                    main: colorTokens.primary[300]
                },
                error: {
                    main: "#ef5350"
                },
                neutral: {
                    dark: colorTokens.grey[0],
                    mediumDark: colorTokens.grey[100],
                    main: colorTokens.grey[200],
                    mediumLight: colorTokens.grey[700],
                    mediumLighter: colorTokens.grey[850],
                    light: colorTokens.grey[900]
                },
                background: {
                    default: colorTokens.grey[900],
                    alt: colorTokens.grey[800],
                    hover: colorTokens.grey[1]
                }
            } : {
                // LIGHT MODE
                primary: {
                    dark: colorTokens.primary[700],
                    main: colorTokens.primary[400],
                    light: colorTokens.primary[300]
                },
                error: {
                    main: "#e53935"
                },
                secondary: {
                    main: colorTokens.primary[400]
                },
                neutral: {
                    dark: colorTokens.grey[1000],
                    mediumDark: colorTokens.grey[600],
                    main: colorTokens.grey[400],
                    mediumLight: colorTokens.grey[100],
                    mediumLighter: colorTokens.grey[200],
                    light: colorTokens.grey[50]
                },
                background: {
                    default: colorTokens.grey[100],
                    alt: colorTokens.grey[0],
                    hover: colorTokens.grey[1001]
                }
            }
        },
        typography: {
            fontFamily: ["Quicksand", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Quicksand", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Quicksand", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Quicksand", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Quicksand", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Quicksand", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Quicksand", "sans-serif"].join(","),
                fontSize: 14,
            }
        }
    }
};