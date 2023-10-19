import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import ApiManager from "src/api/apiManager";
import { useEffect, useState } from "react";
let apiManager = ApiManager.getInstance();
const now = new Date();

const Page = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    let userData = apiManager._getTokenUser();
    setUser(userData);
  }, []);
  return (
    <>
      <Head>
        {user.role == 1 ? (
          <title>Overview Admin | Click App</title>
        ) : (
          <title>Overview Sub Admin | Click App</title>
        )}
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Admin Dashboard</Typography>
              </Stack>
              <div></div>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
