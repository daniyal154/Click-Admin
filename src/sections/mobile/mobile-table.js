import PropTypes from "prop-types";
import { format } from "date-fns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useState } from "react";
import { Cancel } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
const ITEM_HEIGHT = 48;

export const MobileTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(0);

  const handleClose = () => {
    setDeleteID(0);
    setOpen(false);
  };

  const deleteMobile = (id) => {
    setDeleteID(id);
    setOpen(true);
  };
  const removeObjectWithId = (id) => {
    let newArr = [...items];
    newArr = newArr.filter(function (obj) {
      return obj.id !== id;
    });
    setItems(newArr);
  };
  const handleSubmit = () => {
    apiManager.delete("/mobile/" + deleteID).then((data) => {
      if (data.responseCode == 200) {
        removeObjectWithId(deleteID);
        setDeleteID(0);
      }else{
        toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
      setOpen(false);
    });
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Connected Devices</TableCell>
                <TableCell>IP</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((user) => {
                const isSelected = selected.includes(user.id);
                {
                  /* const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); */
                }

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    <TableCell padding="checkbox">{user.id}</TableCell>
                    <TableCell> {user.name}</TableCell>
                    <TableCell>
                      {user?.devices?.length}
                      {/* <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={customer.avatar}>{getInitials(customer.name)}</Avatar>
                        <Typography variant="subtitle2">{customer.name}</Typography>
                      </Stack> */}
                    </TableCell>

                    <TableCell>{user.ip}</TableCell>
                    <TableCell>
                      <Link href={"/mobile/" + user.id}>
                        <IconButton tooltip="Edit User">
                          <EditIcon sx={{ marginRight: "5px", color: "black" }} />
                        </IconButton>
                      </Link>
                      <IconButton tooltip="Delete User">
                        <DeleteIcon
                          sx={{ color: "black" }}
                          onClick={(e) => deleteMobile(user.id)}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure you want to delete?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};