export const colorTokens = {
    grey: {
      50:   "#eceff1",
      100:  "#cfd8dc",
      200:  "#b0bec5",
      300:  "#90a4ae",
      400:  "#78909c",
      500:  "#607d8b",
      600:  "#546e7a",
      700:  "#455a64",
      800:  "#37474f",
      900:  "#263238"
    },
    primary: {
      50:  "#ede7f6",
      100: "#d1c4e9",
      200: "#b39ddb",
      300: "#9575cd",
      400: "#7e57c2",
      500: "#673ab7",
      600: "#5e35b1",
      700: "#512da8",
      800: "#4527a0",
      900: "#311b92",
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
                    main: colorTokens.primary[500],
                    light: colorTokens.primary[800]
                },
                neutral: {
                    dark: colorTokens.grey[100],
                    main: colorTokens.grey[200],
                    mediumMain: colorTokens.grey[300],
                    medium: colorTokens.grey[400],
                    light: colorTokens.grey[700]
                },
                background: {
                    default: colorTokens.grey[900],
                    alt: colorTokens.grey[800],
                }
            } : {
                // LIGHT MODE
                primary: {
                    dark: colorTokens.primary[700],
                    main: colorTokens.primary[500],
                    light: colorTokens.primary[200]
                },
                neutral: {
                    dark: colorTokens.grey[700],
                    main: colorTokens.grey[500],
                    mediumMain: colorTokens.grey[400],
                    medium: colorTokens.grey[300],
                    light: colorTokens.grey[50]
                },
                background: {
                    default: colorTokens.grey[100],
                    alt: colorTokens.grey[50],
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