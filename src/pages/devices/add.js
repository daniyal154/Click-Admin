import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { UserAddForm, UserEditForm } from 'src/sections/users/userAddForm';
import { DeviceAddForm } from 'src/sections/devices/deviceAddForm';
import ApiManager from 'src/api/apiManager';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
let apiManager = ApiManager.getInstance();

const Page = () => {
  let router = useRouter();
  useEffect(() =>{
    let user = apiManager._getUser();
    if(!user?.mobile_id){
      router.push("/mobile")
    }
  },[])
  return (<>
    <Head>
      <title>
        Add Devices
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Devices
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              {/* <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid> */}
              <Grid
                xs={12}
                md={12}
                lg={12}
              >
                <DeviceAddForm />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
