import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Select,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import ApiManager from "src/api/apiManager";
let apiManager = ApiManager.getInstance();
export const DeviceEditForm = (props) => {
  const [values, setValues] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    if (props.id) {
      let device = { ...props.device };
      
      device.allowed_devices = props?.device?.device_limit;
      setValues(device);
    }
  }, [props.device]);
  const handleSubmit = () => {
    apiManager.patch("/device/"+props.id, { ...values }).then((data) => {
      if (data.message == 200) {
        location.reload;
      } else {
      }
    });
  };
  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    if(event.target.name == "password" && event.target.value == ""){
      let device = {...values};
      delete device["password"];
      setValues(device);
    }
  }, []);

  return (
    <form autoComplete="off" noValidate>
      <Card>
        {/* <CardHeader subheader="The information can be edited" title="Profile" /> */}
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the Name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.device_name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  required
                  type="password"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Update details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
