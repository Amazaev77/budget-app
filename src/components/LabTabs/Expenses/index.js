import React, { useEffect, useState } from "react";
import Expense from "./Expense";
import AddIcon from "@material-ui/icons/Add";
import { loadExpenses } from "../../../redux/features/expenses";
import { useDispatch, useSelector } from "react-redux";
import PreloaderToTable from "./PreloaderToTable";
import ComponentTextFields from "./ComponentTextFields";
import {
  Container,
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Fab,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));

const Expenses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expenses.items);
  const loading = useSelector((state) => state.expenses.loading);

  const [showTextFields, setShowTextFields] = useState(false);

  const preloader = new Array(3)
    .fill()
    .map((_, index) => <PreloaderToTable key={index} />);

  useEffect(() => {
    dispatch(loadExpenses());
  }, [dispatch]);

  const handleShowTextFields = () => {
    setShowTextFields(!showTextFields);
  };

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Категория</TableCell>
              <TableCell className={classes.head}>Сумма</TableCell>
              <TableCell className={classes.head}>Время</TableCell>
              <TableCell className={classes.head}>Комментарий</TableCell>
              <TableCell className={classes.head} />
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
          <Fab aria-label="add" onClick={handleShowTextFields} color="primary">
            <AddIcon />
          </Fab>
        </Box>
      )}
    </Container>
  );
};

export default Expenses;
