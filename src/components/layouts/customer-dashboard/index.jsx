import { Container, Grid } from "@mui/material";
import Navigations from "./Navigations";
import DefaultLayout from "components/layouts/DefaultLayout";

// ======================================================
const CustomerDashboardLayout = ({ children }) => (
  <DefaultLayout>
    <Container
      sx={{
        my: "2rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          lg={3}
          xs={12}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
          }}
        >
          <Navigations />
        </Grid>

        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </DefaultLayout>
);

export default CustomerDashboardLayout;
