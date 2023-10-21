import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Link, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import ApiManager from "src/api/apiManager";
import { UsersTable } from "src/sections/users/users-table";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const now = new Date();
let apiManager = ApiManager.getInstance();

// const useCustomers = (page, rowsPerPage) => {
//   return useMemo(
//     () => {
//       return applyPagination(data, page, rowsPerPage);
//     },
//     [page, rowsPerPage]
//   );
// };

// const useCustomerIds = (customers) => {
//   return useMemo(
//     () => {
//       return customers.map((customer) => customer.id);
//     },
//     [customers]
//   );
// };

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [user, setUser] = useState({});
  let router = useRouter();
  // const customers = useCustomers(page, rowsPerPage);
  // const customersIds = useCustomerIds(customers);
  // const customersSelection = useSelection(customersIds);
  const [data, setData] = useState([]);
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  useEffect(() => {
    let userData = apiManager._getTokenUser();
    setUser(userData);
    if (userData.role != 1) {
      router.push("/");
    }
    apiManager.get("/users").then((arrData) => {
      if (arrData.responseCode == 200) {
        let newData = arrData.responseData;
        setData(newData?.users);
      } else {
        toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
    });
  }, []);
  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Users | List</title>
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
                <Typography variant="h4">Users</Typography>
              </Stack>
              {user.role == 1 ? (
                <div>
                  <Link href={"/users/add"}>
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

            <UsersTable
              count={data.length}
              items={data}
              setItems={setData}
              // onDeselectAll={customersSelection.handleDeselectAll}
              // onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              // onSelectAll={customersSelection.handleSelectAll}
              // onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              // selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
