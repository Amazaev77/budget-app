import React, { useEffect, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import withStyles from "@material-ui/core/styles/withStyles";
import Expense from "./Expense";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import { loadExpenses } from "../../../redux/features/expenses";
import { useDispatch, useSelector } from "react-redux";
import PreloaderToTable from "./PreloaderToTable";
import ComponentTextFields from "./ComponentTextFields";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#242f74",
    color: "#fff",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: "595px",
  },
  colorAddIcon: {
    backgroundColor: "#2bcb46",
    color: "white",
    "&:hover": {
      backgroundColor: "#25b33d",
    },
  },
});

const Expenses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expenses.items);
  const loading = useSelector((state) => state.expenses.loading);

  const [showTextFields, setShowTextFields] = useState(false);

  const preloader = new Array(3)
    .fill()
    .map((_, index) => (
      <PreloaderToTable key={index} StyledTableCell={StyledTableCell} />
    ));

  useEffect(() => {
    dispatch(loadExpenses());
  }, [dispatch]);

  const handleShowTextFields = () => {
    if (showTextFields === true) {
      setShowTextFields(false);
    }
    if (showTextFields === false) {
      setShowTextFields(true);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Категория</StyledTableCell>
              <StyledTableCell>Сумма</StyledTableCell>
              <StyledTableCell>Время&nbsp;</StyledTableCell>
              <StyledTableCell>Комментарий&nbsp;</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && preloader}
            {!loading &&
              expenses.map((expense) => (
                <Expense
                  key={expense.id}
                  showTextFields={showTextFields}
                  handleShowTextFields={handleShowTextFields}
                  expense={expense}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTextFields
        showTextFields={showTextFields}
        handleShowTextFields={handleShowTextFields}
      />
      {!showTextFields && (
        <Box align="center" mt={1}>
          <Fab
            className={classes.colorAddIcon}
            aria-label="add"
            onClick={handleShowTextFields}
          >
            <AddIcon />
          </Fab>
        </Box>
      )}
    </>
  );
};

export default Expenses;
