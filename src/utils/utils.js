import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const themeCreator = (darkMode) => {
  let options;

  if (darkMode) {
    options = {
      palette: {
        type: "dark",
        secondary: {
          main: "#fff",
        },
        primary: {
          main: "#212121",
        },
        success: {
          main: "#fff",
        },
      },
    }
  }

  if (!darkMode) {
    options = {
      palette: {
        type: "light",
        primary: {
          main: "#3f51b5",
        },
        secondary: {
          main: "#f50057",
        },
        success: {
          main: "#4caf50",
        },
      },
    }
  }

  return createMuiTheme(options);
}

export default themeCreator;

