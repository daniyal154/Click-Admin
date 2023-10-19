import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Link, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { UsersTable } from "src/sections/users/users-table";
import ApiManager from "src/api/apiManager";
import { MobileTable } from "src/sections/mobile/mobile-table";
import { DeviceTable } from "src/sections/devices/devices-table";
import { toast } from "react-toastify";
const now = new Date();

let apiManager = ApiManager.getInstance();
const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([])
  // const customers = useCustomers(page, rowsPerPage);
  // const customersIds = useCustomerIds(customers);
  // const customersSelection = useSelection(customersIds);
  const [user, setUser] = useState({});
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  useEffect(() => {
    let userData = apiManager._getUser();
    setUser(userData);
    apiManager.get("/devices").then((arrData)=>{
      if(arrData.responseCode == 200){
        let newData = arrData.responseData
        setData(newData?.devices);

      }else{
        toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
    })
  }, []);
  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Devices | Click App</title>
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
                <Typography variant="h4">Customers</Typography>
                
              </Stack>
              {user?.mobile_id && user.role != 1 ? (
                <div>
                <Link href={"/devices/add"}>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </Link>
                </div>
              ) : (
                <></>
              )}
            </Stack>

            <DeviceTable
              count={data.length}
              items={data}
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
