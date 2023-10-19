import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import ApiManager from "src/api/apiManager";
let apiManager = ApiManager.getInstance();
export const SettingsPassword = () => {
  useEffect(() => {
    let user = apiManager._getUser();
    setValues(user);
  }, []);
  const [values, setValues] = useState({
    password: "",
    name: "",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    if(event.target.name == "password" && event.target.value == ""){
      let settings = {...values};
      delete settings["password"];
      setValues(settings);
    }
  }, []);

  const handleSubmit = () => {
    apiManager.patch("/settings/", { ...values }).then((data) => {
      if (data.message == 200) {
        location.reload;
      } else {
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="User Settings" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              onChange={handleChange}
              type="password"
              value={values.name}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Update</Button>
        </CardActions>
      </Card>
    </form>
  );
};
