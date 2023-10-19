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

export const ViewDeviceTable = (props) => {
  const [addDeviceModal, setAddDeviceModal] = React.useState(false);
  const [viewDeviceModal, setViewDeviceModal] = React.useState(false);
  const items = [{
    "id" : 1,
    "name" : "Device"
  },]
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };
  
  const {
    userID = 0,
  } = props;
  return (
    <Card sx={style}>
      <Scrollbar>
        <Box sx={{ minWidth: 600 }}>
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell>Id</TableCell>
                <TableCell>Device Name</TableCell>
                {/* <TableCell>Connected Devices</TableCell>
                <TableCell>Freeze</TableCell>
                <TableCell>Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((user) => {
                {/* const isSelected = selected.includes(user.id);
                {
                   const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); 
                } */}

                return (
                  <TableRow hover key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell> {user.name}</TableCell>
                    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
      
    </Card>
  );
};