import React from "react";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    zIndex: 1,
    right: 40,
    top: 10,
    color: theme.palette.common.white,
    cursor: "pointer",
  },
}));

const ThemeSwitcher = ({ darkMode, handleSwitchTheme }) => {
  const classes = useStyles();

  return darkMode ? (
    <Brightness7Icon onClick={handleSwitchTheme} className={classes.root} />
  ) : (
    <Brightness4Icon onClick={handleSwitchTheme} className={classes.root} />
  );
};

ThemeSwitcher.propTypes = {
  darkMode: PropTypes.bool,
  handleSwitchTheme: PropTypes.func,
};

export default ThemeSwitcher;
