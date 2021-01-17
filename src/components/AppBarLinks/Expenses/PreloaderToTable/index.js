import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Skeleton from '@material-ui/lab/Skeleton';
import { TableCell, TableRow, IconButton } from "@material-ui/core";

const PreloaderToTable = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton width={132} height={30} />
      </TableCell>
      <TableCell>
        <Skeleton width={132} height={30} />
      </TableCell>
      <TableCell>
        <Skeleton width={132} height={30} />
      </TableCell>
      <TableCell>
        <div>
          <IconButton disabled aria-label="delete">
            <EditIcon />
          </IconButton>
          <IconButton disabled color="secondary" aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton disabled aria-label="delete">
            <FileCopyIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PreloaderToTable;
