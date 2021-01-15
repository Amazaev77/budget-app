import React, { useEffect, useState } from "react";
import { AppBar, Tab, makeStyles } from "@material-ui/core";
import { TabList, TabPanel, TabContext } from "@material-ui/lab";
import Expenses from "./Expenses";
import Statistics from "./Statistics";
import { useDispatch } from "react-redux";
import Categories from "./Categories";
import { loadCategories } from "../../redux/features/categories";
import { Route, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  flexContainer: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },
  },
});

export default function LabTabs() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const handleChangeLinkToMain = () => history.push("/");
  const handleChangeLinkToCategories = () => history.push("/categories");
  const handleChangeLinkToStatistics = () => history.push("/statistics");

  return (
    <TabContext value={value}>
      <AppBar position="static">
        <TabList
          className={classes.flexContainer}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Расходы" value="1" onClick={handleChangeLinkToMain} />
          <Tab
            label="Категории"
            value="2"
            onClick={handleChangeLinkToCategories}
          />
          <Tab
            label="Статистика расходов"
            value="3"
            onClick={handleChangeLinkToStatistics}
          />
        </TabList>
      </AppBar>
      <Route exact path="/">
        <TabPanel value="1" index={0}>
          <Expenses />
        </TabPanel>
      </Route>
      <Route path="/categories">
        <TabPanel value="2" index={1}>
          <Categories />
        </TabPanel>
      </Route>
      <Route path="/statistics">
        <TabPanel value="3" index={2}>
          <Statistics />
        </TabPanel>
      </Route>
    </TabContext>
  );
}
