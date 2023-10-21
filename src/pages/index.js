import Head from "next/head";
import { subDays, subHours } from "date-fns";
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
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
import { useCallback, useEffect, useState } from "react";
import { DeviceTableDashboard } from "src/sections/devices/devices-table-dashboard";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { toast } from "react-toastify";
let apiManager = ApiManager.getInstance();
const now = new Date();

const Page = () => {
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [online, setOnline] = useState([]);
  const [data, setData] = useState([]);
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);
  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    let userData = apiManager._getTokenUser();
    setUser(userData);
    apiManager.get("/users/devices").then((arrData) => {
      if (arrData.responseCode == 200) {
        let newData = arrData.responseData;
        setData(newData?.devices);
        setTotal(newData.total);
        setOnline(newData.online)
      } else {
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
        <title>Overview | Click App</title>
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
                <Typography variant="h4">Dashboard({online.length ?? 0} / {total})</Typography>
              </Stack>
            </Stack>

            <DeviceTableDashboard
              count={data.length}
              items={data}
              online={online}
              setItems={setData}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
