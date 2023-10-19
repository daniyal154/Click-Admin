import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import ApiManager from "src/api/apiManager";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserEditForm } from "src/sections/users/userEditForm";
import { MobileEditForm } from "src/sections/mobile/mobileEditForm";
import { toast } from "react-toastify";
let apiManager = ApiManager.getInstance();
const Page = () => {
  const router = useRouter();
  const id = router.query.id;
  const [mobile, setMobile] = useState({});
  useEffect(() => {
    apiManager.get("/mobile", { id: id }).then((data) => {
      if (data.responseCode == 200) {
        let newData = data.responseData;
        setMobile(newData?.mobile);
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
        <title>Mobile | Edit</title>
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
              <Typography variant="h4">Mobile</Typography>
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
                  <MobileEditForm id={id} mobile={mobile} />
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
