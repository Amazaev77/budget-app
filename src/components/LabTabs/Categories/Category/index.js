import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import { editCategory } from '../../../../redux/features/categories';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../../../redux/features/categories';

const useStyles = makeStyles(() => ({
  editICon: {
    color: "#2ba832",
  },
  padding: {
    padding: '12px 12px 12px 16px'
  },
  icons: {
    textAlign: 'center',
    padding: '12px 12px 12px 16px'
  },
  inputStyles: {
    width: '120px',
    fontSize: '15px'
  },
  tdChild: {
    width: '178px'
  }
}))

const Category = ({ category }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showEditInputs, setShowEditInputs] = useState(false);
  const [newValueCategory, setNewValueCategory] = useState(category.text);

  const handleChangeCategory = (e) => {
    setNewValueCategory(e.target.value)
  }

  const handleShowEditInputs = () => {
    setShowEditInputs(true)
  }

  const handleEditCategory = () => {
    dispatch(editCategory(category.id, newValueCategory));
    setShowEditInputs(false);
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleEditCategory()
    }
  }

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(category.id));
  }

  return (
    <TableRow>
      <TableCell className={classes.padding}>
        <div className={classes.tdChild}>
          {!showEditInputs && category.text}
          {showEditInputs && (
            <Input
              onBlur={handleEditCategory}
              className={classes.inputStyles}
              value={newValueCategory}
              onKeyDown={handleKeyDown}
              onChange={handleChangeCategory}
              placeholder="Новое значение"
              autoFocus
            />
          )}
        </div>
      </TableCell>
      <TableCell className={classes.icons}>

        <IconButton
          aria-label="delete"
          onClick={handleShowEditInputs}
        >
          <EditIcon className={classes.editICon} />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="delete"
          onClick={handleDeleteCategory}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default Category;
