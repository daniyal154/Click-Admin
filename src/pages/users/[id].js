import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import ApiManager from "src/api/apiManager";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserEditForm } from "src/sections/users/userEditForm";
import { toast } from "react-toastify";
let apiManager = ApiManager.getInstance();
const Page = () => {
  const router = useRouter();
  const id = router.query.id;
  const [user, setUser] = useState({});
  useEffect(() => {
    let userData = apiManager._getTokenUser();
    if (userData.role != "1") {
      router.push("/");
    }
    apiManager.get("/users", { id: id }).then((data) => {
      if (data.responseCode == 200) {
        let newData = data.responseData;
        setUser(newData?.users);
      }else{
        toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title>Users | Edit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">User</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                {/* <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid> */}
                <Grid xs={12} md={12} lg={12}>
                  <UserEditForm id={id} user={user} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
