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
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
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
import { AddDeviceTable } from "./addDeviceTable";
import { ViewDeviceTable } from "./viewDeviceTable";
import ApiManager from "src/api/apiManager";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { toast } from "react-toastify";
const ITEM_HEIGHT = 48;

const ROLES = {
  1: "Super Admin",
  2: "Sub Admin",
};
let apiManager = ApiManager.getInstance();
export const UsersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    setItems,
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

  const deleteUser = (id) => {
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
    apiManager.delete("/users/" + deleteID).then((data) => {
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
  const handleSwitch = (e, id) => {
    apiManager.post("/freezeUnfreeze", { status: e.target.checked, user_id: id }).then((data) => {
      if (data.responseCode == 200) {
        let newArr = [...items];
        newArr[id].status = value ? 2 : 1;
        setItems(newArr);
      } else {
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
                <TableCell>Connected Devices</TableCell>
                <TableCell>Allowed Devices</TableCell>
                <TableCell>Freeze</TableCell>
                <TableCell>Role</TableCell>
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
                    <TableCell>{user?.devices?.length}</TableCell>
                    <TableCell>{user?.device_limit}</TableCell>

                    <TableCell>
                      {user.role != 1 ? (
                        <Switch
                          defaultChecked={user.status == 2}
                          onChange={(e) => handleSwitch(e, user.id)}
                        />
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    <TableCell>{ROLES[user.role]}</TableCell>
                    <TableCell>
                      {user.role != 1 ? (
                        <Link href={"/users/" + user.id}>
                          <IconButton tooltip="Edit User">
                            <EditIcon sx={{ marginRight: "5px", color: "black" }} />
                          </IconButton>
                        </Link>
                      ) : (
                        <></>
                      )}
                      {user.role != 1 && user?.devices?.length < 1 ? (
                        <IconButton tooltip="Delete User">
                          <DeleteIcon
                            sx={{ color: "black" }}
                            onClick={(e) => deleteUser(user.id)}
                          />
                        </IconButton>
                      ) : (
                        <></>
                      )}
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
