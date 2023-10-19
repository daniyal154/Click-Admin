import PropTypes from "prop-types";
import { format } from "date-fns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
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
import { AddCircleOutline, Cancel } from "@mui/icons-material";

export const AddDeviceTable = (props) => {
  const { setAddDeviceModal } = props;
  const [selected, setSelected] = useState([]);
  const selectItem = (i, checked) => {
    let selectedItems = { ...selected };
    if (checked) {
      selectedItems[i] = items[i];
    } else {
      delete selectedItems[i];
    }
    setSelected(selectedItems);
  };

  const addButton = (event, i) => {
    let allItems = [...items];
    allItems[i].button = event.target.value;
    setItems(allItems);
    if (typeof selected[i] != "undefined") {
      let selectedItems = { ...selected };
      selectedItems[i] = items[i];
      setSelected(selectedItems);
    }
  };

  const handleSave = () => {
    if (Object.keys(selected).length == 0) {
      alert("Empty");
      return false;
    }
    let buttonNotSelected = false;
    Object.keys(selected).map((item) => {
      if (selected[item].button < 1) {
       
        buttonNotSelected = true;
      }
    });
    if (buttonNotSelected) {
      alert("Select Button")
    } else {
      alert("Success");
    }
  };
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Device",
      button: 0,
    },
  ]);

  return (
    <Card sx={style}>
      <Scrollbar>
        <Box sx={{ minWidth: 600 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    // checked={selectedAll}
                    // indeterminate={selectedSome}
                    onChange={(event) => {
                      // if (event.target.checked) {
                      //   onSelectAll?.();
                      // } else {
                      //   onDeselectAll?.();
                      // }
                    }}
                  />
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Device Name</TableCell>
                <TableCell>Button</TableCell>
                {/* <TableCell>Connected Devices</TableCell>
                <TableCell>Freeze</TableCell>
                <TableCell>Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((user, i) => {
                {
                  /* const isSelected = selected.includes(user.id);
                {
                   const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); 
                } */
                }

                return (
                  <TableRow hover key={user.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        key={i}
                        defaultChecked={typeof selected[i] === "undefined" ? false : true}
                        onChange={(event) => {
                          selectItem?.(i, event.target.checked);
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell> {user.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Button</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={user.button}
                          label="Buttton"
                          onChange={(e) => addButton(e, i)}
                        >
                          <MenuItem value={0}>Select Button</MenuItem>
                          <MenuItem value={1}>Button 1</MenuItem>
                          <MenuItem value={2}>Button 2</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Button
            variant="outlined"
            color="success"
            sx={{ float: "right" }}
            startIcon={<AddCircleOutline />}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => setAddDeviceModal(false)}
            color="error"
            sx={{ float: "right", "margin-right": "10px" }}
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
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

