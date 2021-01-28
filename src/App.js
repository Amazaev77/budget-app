import React, { useState } from "react";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import AppBarLinks from "./components/AppBarLinks";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeSwitcher from "./components/ThemeSwitcher";
import themeCreator from "./utils/utils";

const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const classes = useStyles();

  const theme = themeCreator(darkMode);

  const handleSwitchTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" className={classes.container}>
          <ThemeSwitcher
            darkMode={darkMode}
            handleSwitchTheme={handleSwitchTheme}
          />
          <AppBarLinks />
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
