import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
// import { useAuth } from 'src/hooks/use-auth';

let apiManager = ApiManager.getInstance();
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import ApiManager from "src/api/apiManager";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    let user = apiManager._getToken();
    if (!user) {
    } else {
      router.push("/");
    }
  }, []);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = () => {
    setShowError(false);
    setErrors({});
    apiManager.post("/login", { ...values }).then((data) => {
      if (data.responseCode == 200) {
        let newData = data.responseData;
        apiManager._setToken(newData.token);
        apiManager._setUser(JSON.stringify(newData.user));
        router.push("/");
      } else {
        if (data.message == 5001) {
          let err = data.errors.errors;
          let errArr = [];
          err.map((value, index) => {
            errArr[value.path] = value.msg;
          });
          setErrors(errArr);
        } else {
          let newData = data.responseData;
          setShowError(newData?.msg);
          toast.error("Something Went Wrong", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
        }
      }
      console.log(data);
    });
  };

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
            </Stack>

            <form noValidate>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  // helperText={"Username"}
                  error={errors.username ? true : false}
                  helperText={errors?.username && errors?.username}
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                />
                <TextField
                  fullWidth
                  error={errors.password ? true : false}
                  helperText={errors?.password && errors?.password}
                  // helperText="Password"
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                />
              </Stack>
              {showError ? (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {showError}
                </Typography>
              ) : (
                <></>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="button"
                onClick={handleSubmit}
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
