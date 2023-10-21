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
import ApiManager from "src/api/apiManager";

const ITEM_HEIGHT = 48;

export const DeviceTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    setItems
  } = props;
  const apiManager = ApiManager.getInstance();
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(0);

  const handleClose = () => {
    setDeleteID(0);
    setOpen(false);
  };

  const deleteDevice = (id) => {
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
    apiManager.delete("/device/" + deleteID).then((data) => {
      if (data.responseCode == 200) {
        removeObjectWithId(deleteID);
        setDeleteID(0);
      } else {
        toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
      setOpen(false);
    });
  };

  const handleSwitch = (e, user,id) => {
    let value = e.target.checked;
    apiManager
      .post("/device/freezeUnfreeze", { status: value, device_id: user.id,user_id:user.user_id })
      .then((data) => {
        if(data.responseCode == 200){
          let newArr = [...items];
          newArr[id].status = value ? 2 : 1;
          setItems(newArr);
        }else{
          toast.error(data?.responseData?.error ?? "Something Went Wrong", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
          return false;
        }
      });
  };
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Button</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Freeze</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((user,id) => {
                const isSelected = selected.includes(user.id);
                {
                  /* const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); */
                }

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    <TableCell padding="checkbox">{user.id}</TableCell>
                    <TableCell> {user.device_name}</TableCell>
                    <TableCell> {user.button}</TableCell>
                    <TableCell>{user?.user?.name}</TableCell>
                    <TableCell>
                      <Switch
                        // defaultChecked={user.status == 2}
                        onChange={(e) => handleSwitch(e, user,id)}
                        checked={user.status == 2}
                      />
                    </TableCell>
                    <TableCell>
                      <Link href={"/devices/" + user.id}>
                        <IconButton tooltip="Edit User">
                          <EditIcon sx={{ marginRight: "5px", color: "black" }} />
                        </IconButton>
                      </Link>
                      <IconButton tooltip="Delete User">
                        <DeleteIcon
                          sx={{ color: "black" }}
                          onClick={(e) => deleteDevice(user.id)}
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
