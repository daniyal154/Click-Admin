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
import { Cancel, Circle } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
const ITEM_HEIGHT = 48;

export const DeviceTableDashboard = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    online=[],
    selected = [],
  } = props;

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
                <TableCell>User</TableCell>
                <TableCell>Status</TableCell>
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
                    <TableCell> {user.device_name}</TableCell>
                    <TableCell>{user?.user?.name}</TableCell>
                    
                    <TableCell>
                      {online?.includes(user.id) ? (
                        <Circle sx ={{ color:'success.main' }}/>
                      ) : (<Circle sx={{ color: "error.main"}} />)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>  
    </Card>
  );
};