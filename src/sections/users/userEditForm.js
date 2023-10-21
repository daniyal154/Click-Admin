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
import { toast } from "react-toastify";
let apiManager = ApiManager.getInstance();
export const UserEditForm = (props) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
    allowed_devices: "0",
    role: 0,
  });
  useEffect(() => {
    console.log(props.user);
    if (props.id) {
      let user = { ...props.user };

      user.allowed_devices = props?.user?.device_limit;
      setValues(user);
    }
  }, [props.user]);
  const handleSubmit = () => {
    setErrors({});
    apiManager.patch("/users/" + props.id, { ...values }).then((data) => {
      if (data.responseCode == 200) {
        location.reload();
      } else {
        if (data.message == 5001) {
          let err = data.errors.errors;
          let errArr = [];
          err.map((value, index) => {
            errArr[value.path] = value.msg;
          });
          setErrors(errArr);
        } else {
          toast.error("Something Went Wrong", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
        }
      }
    });
  };
  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name == "password" && event.target.value == "") {
      let user = { ...values };
      delete user["password"];
      setValues(user);
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
                  error={errors.name ? true : false}
                  helperText={errors?.name && errors?.name}
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  error={errors.allowed_devices ? true : false}
                  helperText={errors?.allowed_devices && errors?.allowed_devices}
                  label="Devices Allowed"
                  name="allowed_devices"
                  onChange={handleChange}
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  value={values.allowed_devices}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  error={errors.password ? true : false}
                  helperText={errors?.password && errors?.password}
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
