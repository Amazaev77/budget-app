import React, { useState } from "react";
import {
  makeStyles,
  TableRow,
  TableCell,
  IconButton,
  Input,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { editCategory } from "../../../../redux/features/categories";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../../../redux/features/categories";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.success.main,
  },
}));

const Category = ({ category }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showEditInputs, setShowEditInputs] = useState(false);
  const [newValueCategory, setNewValueCategory] = useState(category.text);

  const handleChangeCategory = (e) => {
    setNewValueCategory(e.target.value);
  };

  const handleShowEditInputs = () => {
    setShowEditInputs(true);
  };

  const handleEditCategory = () => {
    dispatch(editCategory(category.id, newValueCategory));
    setShowEditInputs(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleEditCategory();
    }
  };

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(category.id));
  };

  return (
    <TableRow>
      <TableCell>
        <Box display="flex" justifyContent="space-between">
          <Box alignSelf="center">
            {!showEditInputs && category.text}
            {showEditInputs && (
              <Input
                onBlur={handleEditCategory}
                value={newValueCategory}
                onKeyDown={handleKeyDown}
                onChange={handleChangeCategory}
                placeholder="Новое значение"
                autoFocus
              />
            )}
          </Box>
          <Box>
            <IconButton
              aria-label="delete"
              disabled={showEditInputs}
              onClick={handleShowEditInputs}
              className={classes.root}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="delete"
              onClick={handleDeleteCategory}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

export default Category;
