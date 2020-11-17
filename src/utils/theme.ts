import { extendTheme } from "@chakra-ui/core";

export const theme = extendTheme({
  icons: {
    iconLogo: {
      path: "/images/tinder.svg"
    }
  },
  colors: {
    tinder: {
      primary: "rgb(231,86,56)",
      secondary: "#FE3C72",
      secondaryBg: "#f2f2f2",
      bg: "#424242"
    }
  },
  textStyles: {
    logo: {
      fontSize: "50px",
      lineHeight: "110%",
      letterSpacing: "-3px",
      color: "rgb(231,86,56)"
    },
    matchMessage: {
      letterSpacing: "-1px",
      fontWeight: "bold"
    }
  }
});
