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
import { useRouter } from "next/router";
import { toast } from "react-toastify";
let apiManager = ApiManager.getInstance();

export const MobileAddForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
  });
  const handleSubmit = () => {
    setErrors({});
    apiManager.post("/mobile", { ...values }).then((data) => {
      if (data.responseCode == 200) {
        let user = apiManager._getUser();
        let newData = data?.responseData;
        let newUser = { ...user, mobile_id: newData?.mobile?.id };
        apiManager._setUser(JSON.stringify(newUser));
        router.push("/mobile");
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
    <form autoComplete="off">
      <Card>
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
                  error={errors.username ? true : false}
                  helperText={errors?.username && errors?.username}
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
                  error={errors.password ? true : false}
                  helperText={errors?.password && errors?.password}
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  required
                  type="password"
                  value={values.password}
                />
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
