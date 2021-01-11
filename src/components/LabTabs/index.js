import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Expenses from "./Expenses";
import { Container } from "@material-ui/core";
import ExpenseStatistics from "./ExpenseStatistics";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import withStyles from "@material-ui/core/styles/withStyles";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import NativeSelects from "./NativeSelects";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./Categories";
import { loadCategories } from "../../redux/features/categories";
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },
  },
  item: {
    fontSize: "20px",
    color: "#101a51",
    margin: "25px 0 10px",
    lineHeight: "48px",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#242f74",
    color: "#fff",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function LabTabs() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState("1");
  const [month, setMonth] = useState("Февраль");

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const expenses = useSelector((state) => state.expenses.items);

  const expensesGroup = Object.entries(
    expenses.reduce((group, expense) => {
      if (month.toLowerCase() !== moment(expense.date).format('MMMM') ) {
        return '';
      }
      if (!group[expense.category]) {
        group[expense.category] = 0;
      }

      group[expense.category] = group[expense.category] + expense.sum;
      return group;
    }, {})
  );

  return (
    <TabContext value={value}>
      <AppBar position="static">
        <TabList
          className={classes.root}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Расходы" value="1" />
          <Tab label="Категории" value="2" />
          <Tab label="Статистика расходов" value="3" />
        </TabList>
      </AppBar>
      <TabPanel value="1">
        <Container maxWidth="lg">
          <Expenses />
        </Container>
      </TabPanel>
      <TabPanel value="2">
        <Categories />
      </TabPanel>
      <TabPanel value="3">
        <ExpenseStatistics>
          <Container maxWidth="xs">
            <Grid className={classes.item} container>
              <Grid item md={4}>
                Потрачено за
              </Grid>
              <Grid item md={6}>
                <NativeSelects
                  month={month}
                  handleChangeMonth={handleChangeMonth}
                />
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Категория</StyledTableCell>
                    <StyledTableCell>Сумма</StyledTableCell>
                  </TableRow>
                  {expensesGroup.map((arr, index) => {
                    const [category, sum] = arr;
                    return (
                      <TableRow key={index}>
                        <TableCell>{category}</TableCell>
                        <TableCell>{sum}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableHead>
              </Table>
            </TableContainer>
          </Container>
        </ExpenseStatistics>
      </TabPanel>
    </TabContext>
  );
}
