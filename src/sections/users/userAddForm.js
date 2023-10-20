import { useCallback, useState } from "react";
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
export const UserAddForm = (props) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
    allowed_devices: "0",
    role: 0,
  });
  const handleSubmit = () => {
    setErrors({});
    apiManager.post("/users", { ...values }).then((data) => {
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
                  error={errors.name ? true : false}
                  helperText={errors?.name && errors?.name}
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={errors.username ? true : false}
                  helperText={errors?.username && errors?.username}
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  required
                  value={values.username}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Devices Allowed"
                  name="allowed_devices"
                  error={errors.allowed_devices ? true : false}
                  helperText={errors?.allowed_devices && errors?.allowed_devices}
                  onChange={handleChange}
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  value={values.allowed_devices}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={errors.password ? true : false}
                  helperText={errors?.password && errors?.password}
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  required
                  type="password"
                  value={values.password}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={errors.role ? true : false}
                  helperText={errors?.role && errors?.role}
                  fullWidth
                  label="Select Role"
                  name="role"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.role}
                >
                  <option key={1} value={0}>
                    Select
                  </option>
                  <option key={1} value={1}>
                    Admin
                  </option>
                  <option key={2} value={2}>
                    Sub-Admin
                  </option>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
