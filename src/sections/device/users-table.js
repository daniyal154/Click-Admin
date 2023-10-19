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
import { Cancel } from "@mui/icons-material";
const ITEM_HEIGHT = 48;

export const UsersTable = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [addDeviceModal, setAddDeviceModal] = React.useState(false);
  const [viewDeviceModal, setViewDeviceModal] = React.useState(false);
  const addDevice = () => setAddDeviceModal(true);
  const viewDevices = () => setViewDeviceModal(true);
  const handleCloseAddDeviceModal = () => setAddDeviceModal(false);
  const handleCloseViewDeviceModal = () => setViewDeviceModal(false);
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                <TableCell>Freeze</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user) => {
                const isSelected = selected.includes(user.id);
                {
                  /* const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); */
                }

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    <TableCell padding="checkbox">{user.id}</TableCell>
                    <TableCell> {user.name}</TableCell>
                    <TableCell>
                      {user.connected_devices}
                      {/* <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={customer.avatar}>{getInitials(customer.name)}</Avatar>
                        <Typography variant="subtitle2">{customer.name}</Typography>
                      </Stack> */}
                    </TableCell>

                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "20ch",
                          },
                        }}
                      >
                          <MenuItem
                            onClick={addDevice}
                          >
                            Add Device
                          </MenuItem>
                          <MenuItem
                            onClick={viewDevices}
                          >
                            View Devices
                          </MenuItem>

                      </Menu>
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
      <Modal
      
        open={addDeviceModal}
        onClose={handleCloseAddDeviceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <AddDeviceTable setAddDeviceModal={setAddDeviceModal}></AddDeviceTable>
          
      </Modal>
      <Modal
      
        open={viewDeviceModal}
        onClose={handleCloseViewDeviceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <ViewDeviceTable ></ViewDeviceTable>
      </Modal>
    </Card>
  );
};
