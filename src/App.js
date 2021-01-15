import React, { useState } from "react";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import LabTabs from "./components/LabTabs";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { BrowserRouter as Router } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    zIndex: 1,
    right: 40,
    top: 10,
    color: theme.palette.common.white,
    cursor: "pointer",
  },
  container: {
    position: "relative",
  },
}));

const App = () => {
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);

  const handleChangeTheme = () => {
    setDarkMode(!darkMode);
  };

  const darkTheme = createMuiTheme({
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
  });

  const lightTheme = createMuiTheme({
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
  });

  return (
    <Router>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Container maxWidth="lg" className={classes.container}>
          {darkMode ? (
            <Brightness7Icon
              onClick={handleChangeTheme}
              className={classes.root}
            />
          ) : (
            <Brightness4Icon
              onClick={handleChangeTheme}
              className={classes.root}
            />
          )}
          <LabTabs />
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
