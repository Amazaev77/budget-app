import React, { useState } from "react";
import { Container, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import withStyles from '@material-ui/core/styles/withStyles';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import PreloaderToTable from '../Expenses/PreloaderToTable';
import Category from './Category';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { addCategory } from '../../../redux/features/categories';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#242f74",
    color: "#fff",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles(() => ({
  textField: {
    flexGrow: 1
  },
  button: {
    marginLeft: '13px'
  }
}));

const Categories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);

  const [newCategory, setNewCategory] = useState("");

  const newCategoryHandler = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = () => {
    dispatch(addCategory(newCategory, categories.length));
    setNewCategory("");
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAddCategory();
    }
  }

  const preloader = new Array(3)
    .fill()
    .map((_, index) => (
      <PreloaderToTable key={index} StyledTableCell={StyledTableCell} />
    ));

  return (
    <Container maxWidth='xs'>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Категории</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && preloader}
            {categories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt="12px" display="flex">
        <TextField
          className={classes.textField}
          size='small'
          id="outlined-basic"
          label="Новая категория"
          variant="outlined"
          value={newCategory}
          onChange={newCategoryHandler}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleAddCategory}
        >
          Добавить
        </Button>
      </Box>
    </Container>
  );
};

export default Categories;
