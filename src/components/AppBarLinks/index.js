import React, { useEffect } from "react";
import { AppBar, makeStyles, Button } from "@material-ui/core";
import Expenses from "./Expenses";
import Statistics from "./Statistics";
import { useDispatch } from "react-redux";
import Categories from "./Categories";
import { loadCategories } from "../../redux/features/categories";
import { Route, NavLink } from "react-router-dom";
import { loadExpenses } from "../../redux/features/expenses";
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "inherit",
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
    marginBottom: theme.spacing(3),
    "& a": {
      textDecoration: "none",
      marginLeft: theme.spacing(2),
    },
  },
  text: {
    color: theme.palette.common.white,
    flexBasis: 190,
  },
  navLink: {
    background: theme.palette.primary.light,
    borderRadius: 4,
  },
  GitHubIconLink: {
    position: 'absolute',
    top: 10,
    left: 30
  },
  GitHubIcon: {
    color: theme.palette.common.white
  }
}));

export default function LabTabs() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadExpenses());
  }, [dispatch]);

  return (
    <>
      <a
        href="https://github.com/Amazaev77/budget-app"
        className={classes.GitHubIconLink}
      >
        <GitHubIcon className={classes.GitHubIcon}/>
      </a>
      <AppBar className={classes.root} position="static">
        <NavLink to="/" activeClassName={classes.navLink} exact>
          <Button className={classes.text}>Расходы</Button>
        </NavLink>
        <NavLink to="/categories" activeClassName={classes.navLink}>
          <Button className={classes.text}>Категории</Button>
        </NavLink>
        <NavLink to="/statistics" activeClassName={classes.navLink}>
          <Button className={classes.text}>Статистика расходов</Button>
        </NavLink>
      </AppBar>
      <Route exact path="/" component={Expenses} />
      <Route path="/categories" component={Categories} />
      <Route path="/statistics" component={Statistics} />
    </>
  );
}
