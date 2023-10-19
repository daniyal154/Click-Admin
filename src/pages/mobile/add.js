import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { MobileAddForm } from "src/sections/mobile/mobileAddForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ApiManager from "src/api/apiManager";
let apiManager = ApiManager.getInstance();
const Page = () => {
  let router = useRouter();
  useEffect(() => {
    let user = apiManager._getUser();
    if (user?.mobile_id) {
      router.push("/mobile");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Add Mobile</title>
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
                  <MobileAddForm />
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
