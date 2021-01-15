import React from "react";
import Skeleton from "react-loading-skeleton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { TableCell, TableRow, IconButton } from "@material-ui/core";

const PreloaderToTable = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton width={132} height={20} />
      </TableCell>
      <TableCell>
        <Skeleton width={132} height={20} />
      </TableCell>
      <TableCell>
        <Skeleton width={132} height={20} />
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
